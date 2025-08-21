# Gaia Prototype

A full-stack web application prototype with a Next.js frontend and Node.js backend.

## Project Structure

```
Gaia-prototype/
├── frontend/           # Next.js frontend application
│   ├── src/           # Source code
│   │   ├── app/       # App Router pages
│   │   └── components/# Reusable components
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
├── backend/            # Node.js Express backend
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
└── README.md          # This file
```

## Quick Start

### Frontend (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (Node.js)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
PORT=5000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

5. The API will be available at [http://localhost:5000](http://localhost:5000)

## Features

### Frontend
- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS 4** for styling
- 🔧 **JSX Enabled** with proper configuration
- 📱 **Responsive Design**
- 🚀 **Hot Reload** development

### Backend
- 🖥️ **Express.js** web framework
- 🔒 **CORS** enabled for frontend communication
- 🌍 **Environment Variables** support
- 📊 **Health Check** endpoints
- 🛠️ **Error Handling** middleware

## Development

### Frontend Development
- Edit files in `frontend/src/` for immediate hot reload
- Create new components in `frontend/src/components/`
- Add new pages in `frontend/src/app/`

### Backend Development
- Edit `backend/server.js` for server changes
- Add new routes in the Express app
- Use `npm run dev` for auto-restart during development

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/status` - API status information

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Development**: ESLint, Nodemon
- **Package Manager**: npm

## Contributing

1. Make changes to the respective frontend or backend directories
2. Test your changes locally
3. Ensure both frontend and backend are running
4. Commit your changes

## License

ISC