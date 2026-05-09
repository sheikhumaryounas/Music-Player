# 🚀 Quick Start Guide

## Installation & Setup

### Step 1: Install Dependencies

From the `Music Player` directory:

```bash
npm run install-all
```

This will install all required packages for:
- Server (Express, CORS)
- Client (React, Axios)
- Root (Concurrently)

### Step 2: Start the Application

```bash
npm start
```

This launches both servers:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

The frontend will automatically open in your browser.

### Step 3: Enjoy!

- Browse songs by category
- Search for your favorite tracks
- Play, pause, skip, and adjust volume
- Mark songs as favorites

## 📋 Commands Reference

```bash
# Install all dependencies
npm run install-all

# Start both servers
npm start

# Start server only (port 5000)
npm run server

# Start client only (port 3000)
npm run client

# Start server with auto-reload
cd server && npm run dev

# Build for production
npm run build
```

## 🔧 Troubleshooting

### Port 5000 already in use?
```bash
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Npm dependencies not installing?
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm run install-all
```

### React app not loading?
1. Check if server is running (http://localhost:5000/api/health)
2. Check browser console for errors (F12)
3. Ensure port 3000 is available

## 📁 File Locations

| Purpose | Location |
|---------|----------|
| Express Server | `/server/server.js` |
| React App | `/client/src/App.js` |
| Components | `/client/src/components/` |
| Styling | `/client/src/App.css` |
| API Routes | `/server/server.js` |

## 💡 Tips

1. **Hot Reload**: Changes to React files auto-refresh the browser
2. **Server Restart**: Changes to Express files require manual server restart
3. **API Testing**: Use `curl` or Postman to test API endpoints
4. **Search**: Works across all songs in current playlist

## 🎯 Next Steps

1. Add real audio files to enhance functionality
2. Connect to a database for persistence
3. Add user authentication
4. Deploy to production
5. Add shuffle/repeat features

For detailed information, see README.md
