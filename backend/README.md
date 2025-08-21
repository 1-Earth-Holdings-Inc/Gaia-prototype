# Gaia Backend

A Node.js Express server for the Gaia prototype project.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

## Available Routes

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api/status` - API status information

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (default: development)

## Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Dev Dependencies

- **nodemon** - Auto-restart server during development
