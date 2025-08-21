const mongoose = require('mongoose');

let isConnecting = false;
let cached = global.__gaia_mongoose_connection;

if (!cached) {
  cached = global.__gaia_mongoose_connection = { conn: null };
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  // Ensure DB name Gaia is present
  if (!uri.match(/\/Gaia(\?|$)/)) {
    const [base, qs] = uri.split('?');
    return `${base.replace(/\/?$/, '/Gaia')}${qs ? `?${qs}` : ''}`;
  }
  return uri;
}

async function ensureIndexes() {
  try {
    // Ensure email unique index exists
    const User = require('../models/User');
    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log('✅ Email unique index ensured');
  } catch (error) {
    if (error.code !== 85) { // 85 is "Index already exists" error
      console.error('Error creating email index:', error.message);
    }
  }
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (isConnecting) {
    // wait until connected
    await new Promise((resolve) => {
      const check = setInterval(() => {
        if (cached.conn) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    });
    return cached.conn;
  }

  isConnecting = true;
  const uri = getMongoUri();
  const conn = await mongoose.connect(uri, {
    maxPoolSize: Number(process.env.DB_MAX_POOL || 20),
    minPoolSize: Number(process.env.DB_MIN_POOL || 5),
    serverSelectionTimeoutMS: 10000,
    autoIndex: true,
    dbName: 'Gaia',
  });
  
  // Ensure indexes are created
  await ensureIndexes();
  
  cached.conn = conn;
  isConnecting = false;
  return conn;
}

module.exports = { connectDB };


