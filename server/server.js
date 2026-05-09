const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Music Library
const musicLibrary = [
    // Rock Category
    { id: 1, title: 'Rock Anthem', artist: 'The Stone Era', category: 'rock', duration: 245 },
    { id: 2, title: 'Electric Dreams', artist: 'Voltage Kings', category: 'rock', duration: 198 },
    { id: 3, title: 'Thunder Road', artist: 'Rock Giants', category: 'rock', duration: 267 },
    
    // Pop Category
    { id: 4, title: 'Pop Sensation', artist: 'Sugar Rush', category: 'pop', duration: 203 },
    { id: 5, title: 'Feel Good Song', artist: 'Bright Stars', category: 'pop', duration: 215 },
    { id: 6, title: 'Dancing in the Rain', artist: 'Pop Dynasty', category: 'pop', duration: 236 },
    
    // Jazz Category
    { id: 7, title: 'Midnight Jazz', artist: 'Cool Cats', category: 'jazz', duration: 287 },
    { id: 8, title: 'Smooth Vibes', artist: 'Jazz Masters', category: 'jazz', duration: 256 },
    { id: 9, title: 'Blue Notes', artist: 'Urban Jazz', category: 'jazz', duration: 302 },
    
    // Classical Category
    { id: 10, title: 'Symphony No. 5', artist: 'Classical Orchestra', category: 'classical', duration: 425 },
    { id: 11, title: 'Moonlight Sonata', artist: 'Piano Virtuoso', category: 'classical', duration: 528 },
    { id: 12, title: 'Spring Concerto', artist: 'Violin Ensemble', category: 'classical', duration: 312 },
];

// Routes

// Get all songs
app.get('/api/songs', (req, res) => {
    res.json(musicLibrary);
});

// Get songs by category
app.get('/api/songs/category/:category', (req, res) => {
    const category = req.params.category;
    if (category === 'all') {
        res.json(musicLibrary);
    } else {
        const filteredSongs = musicLibrary.filter(song => song.category === category);
        res.json(filteredSongs);
    }
});

// Search songs
app.get('/api/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    
    if (!query) {
        res.json(musicLibrary);
        return;
    }
    
    const results = musicLibrary.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );
    
    res.json(results);
});

// Get song by ID
app.get('/api/songs/:id', (req, res) => {
    const song = musicLibrary.find(s => s.id === parseInt(req.params.id));
    
    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ error: 'Song not found' });
    }
});

// Get categories
app.get('/api/categories', (req, res) => {
    const categories = ['all', 'rock', 'pop', 'jazz', 'classical'];
    res.json(categories);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Serve static files from React build (in production)
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback to React app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🎵 Music Player Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
