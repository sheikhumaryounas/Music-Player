# 🎵 Web-Based Music Player - React & Node.js

A full-stack music player application built with React (frontend) and Node.js/Express (backend) featuring playlist management, search functionality, and comprehensive playback controls.

## 🏗️ Architecture

- **Frontend**: React 18 with Axios for API calls
- **Backend**: Express.js server with CORS support
- **API**: RESTful endpoints for song management and search
- **Styling**: CSS3 with responsive design

## ✨ Features

### 🎮 Player Controls
- ▶️ Play/Pause toggle
- ⏮️ Previous track
- ⏭️ Next track
- Auto-advance to next song when finished

### 🔊 Volume & Progress
- Volume slider (0-100%)
- Progress bar with seek functionality
- Current time and duration display
- Real-time progress updates

### 📋 Playlist Management
- **All Songs**: Complete music library
- **Categories**: Filter by genre (Rock, Pop, Jazz, Classical)
- **Favorites**: Mark and manage favorite songs
- Display of all songs in current selection

### 🔍 Search & Filter
- Search by song title or artist name
- Real-time search results
- Category-aware filtering
- Empty state handling

### 🎯 Music Organization
- Genre-based categorization
- Current song information display
- Album art placeholder
- Favorite songs tracking

## 📁 Project Structure

```
Music Player/
├── package.json                 # Root package.json for monorepo
├── README.md                    # This file
│
├── server/                      # Node.js/Express Backend
│   ├── package.json
│   ├── server.js               # Express server & routes
│   └── .gitignore
│
└── client/                      # React Frontend
    ├── package.json
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js              # Main App component with state
    │   ├── App.css             # Main styling
    │   ├── index.js            # React entry point
    │   ├── index.css           # Global styles
    │   └── components/
    │       ├── PlayerDisplay.js       # Song info display
    │       ├── PlayerControls.js      # Play/Pause/Skip buttons
    │       ├── ProgressBar.js         # Progress and seek
    │       ├── VolumeControl.js       # Volume slider
    │       ├── SearchBar.js           # Search input
    │       ├── PlaylistSidebar.js     # Category buttons
    │       └── SongList.js            # Song list display
    └── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Navigate to project directory**
   ```bash
   cd "Music Player"
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

   This will install dependencies for:
   - Root project
   - Server (`/server`)
   - Client (`/client`)

### Running the Application

**Option 1: Run both server and client together** (Recommended)
```bash
npm start
```

This will:
- Start Express server on `http://localhost:5000`
- Start React development server on `http://localhost:3000`

**Option 2: Run only the server**
```bash
npm run server-only
```
Server will run on `http://localhost:5000`

**Option 3: Manual startup**
```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

## 🎵 API Endpoints

The Express backend provides these REST API endpoints:

- **GET** `/api/songs` - Get all songs
- **GET** `/api/songs/category/:category` - Get songs by category
- **GET** `/api/songs/:id` - Get specific song
- **GET** `/api/search?q=query` - Search songs
- **GET** `/api/categories` - Get all categories
- **GET** `/api/health` - Health check

### Example API Calls

```bash
# Get all songs
curl http://localhost:5000/api/songs

# Search for songs
curl http://localhost:5000/api/search?q=rock

# Get songs by category
curl http://localhost:5000/api/songs/category/pop

# Get specific song
curl http://localhost:5000/api/songs/1
```

## 🎮 How to Use

1. **Open the application**
   - Navigate to `http://localhost:3000`

2. **Browse music**
   - Click category buttons to filter songs
   - Use search bar to find specific songs

3. **Play music**
   - Click on any song to start playing
   - Use play/pause button to control playback

4. **Control playback**
   - Use ⏮️ and ⏭️ to navigate songs
   - Click progress bar to seek
   - Adjust volume with slider

5. **Manage favorites**
   - Click heart icon (🤍) to add to favorites
   - Favorited songs show filled heart (❤️)

## 🛠️ Development

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `client/build` folder.

### Extending the Music Library

Edit `server/server.js` to add more songs:

```javascript
const musicLibrary = [
    { 
        id: 13, 
        title: 'Your Song', 
        artist: 'Artist Name', 
        category: 'rock',  // or 'pop', 'jazz', 'classical'
        duration: 240      // in seconds
    },
    // ... more songs
];
```

### Adding New Categories

1. Add category to `musicLibrary` songs
2. Update the categories array in `server.js`:
   ```javascript
   const categories = ['all', 'rock', 'pop', 'jazz', 'classical', 'new-category'];
   ```
3. Add emoji icon in `PlaylistSidebar.js`

### Adding Audio Files

To integrate actual audio:

1. Create an `audio` folder in the server public directory
2. Add MP3 files named by ID (e.g., `1.mp3`, `2.mp3`)
3. Uncomment audio loading in `App.js`:
   ```javascript
   // Uncomment in loadSong function if using real audio
   audioRef.current.src = `/api/audio/${currentSong.id}.mp3`;
   ```

## 🔧 Available Scripts

### Root Directory
- `npm start` - Run both server and client
- `npm run install-all` - Install all dependencies
- `npm run build` - Build for production
- `npm run server` - Run server only
- `npm run client` - Run client only

### Server Directory
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload

### Client Directory
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 📦 Dependencies

### Backend
- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing
- `nodemon` (dev) - Auto-restart on file changes

### Frontend
- `react` - UI library
- `react-dom` - React DOM rendering
- `axios` - HTTP client

## 🌐 Browser Support

- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

## 📱 Responsive Design

The player is fully responsive:
- Desktop (1200px+): Full layout with sidebar
- Tablet (768px-1199px): Adjusted layout
- Mobile (<768px): Optimized for touch

## 🎨 Customization

### Changing Colors

Edit `client/src/App.css`:
```css
/* Primary gradient color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your colors */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### Adjusting Sidebar Width

In `App.css`:
```css
.sidebar {
  width: 200px;  /* Change this value */
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (use PID from above)
kill -9 PID
```

### CORS Issues
CORS is already configured in `server.js`. If issues persist, verify both servers are running.

### API Not Responding
- Ensure server is running on port 5000
- Check browser console for error messages
- Verify proxy setting in `client/package.json`

## 📈 Performance

- Lazy loading of playlist items
- Optimized re-renders with React hooks
- CSS animations for smooth UI
- Efficient state management

## 🔒 Security

- Input validation on search
- CORS protection enabled
- No sensitive data exposure
- Safe state management

## 📝 Sample Music Library

The app comes with 12 pre-loaded songs:

- **Rock**: Rock Anthem, Electric Dreams, Thunder Road
- **Pop**: Pop Sensation, Feel Good Song, Dancing in the Rain
- **Jazz**: Midnight Jazz, Smooth Vibes, Blue Notes
- **Classical**: Symphony No. 5, Moonlight Sonata, Spring Concerto

## 🎯 Future Enhancements

Potential features:
- Shuffle and repeat modes
- Playlist creation/export
- Audio visualization
- Equalizer controls
- Keyboard shortcuts
- Dark mode
- PWA support
- Music upload feature
- Collaborative playlists

## 📄 License

MIT

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

---

Enjoy your music! 🎵🎧
