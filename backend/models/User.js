const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    middleInitial: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Male' },
    birthYear: { type: Number },
    birthMonth: { type: Number },
    birthDay: { type: Number },
    generationalIdentity: { type: String, default: '' },
    citizenshipByBirth: { type: String, default: '' },
    birthplaceProvinceState: { type: String, default: '' },
    birthplaceCity: { type: String, default: '' },
    citizenshipByNaturalization: { type: String, default: '' },
    educationLevel: { type: String, default: '' },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      accuracy: { type: Number },
      timestamp: { type: Date }
    },
    earthCharterSigned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.virtual('name').get(function () {
  return [this.firstName, this.middleInitial, this.lastName].filter(Boolean).join(' ');
});

module.exports = mongoose.model('User', userSchema);


