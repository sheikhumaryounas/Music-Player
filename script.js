// Music Library - Sample Data
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

// Player State
const player = {
    currentIndex: 0,
    isPlaying: false,
    playlist: [...musicLibrary],
    favorites: [],
    currentCategory: 'all'
};

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressInput = document.getElementById('progressInput');
const progressFill = document.getElementById('progressFill');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');
const volumePercent = document.getElementById('volumePercent');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songList = document.getElementById('songList');
const searchInput = document.getElementById('searchInput');
const playlistBtns = document.querySelectorAll('.playlist-btn');

// Initialize Player
document.addEventListener('DOMContentLoaded', () => {
    initializePlayer();
    renderPlaylist();
});

// Initialize Player
function initializePlayer() {
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('ended', handleSongEnd);
    
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
    progressInput.addEventListener('input', seekAudio);
    volumeControl.addEventListener('input', handleVolumeChange);
    searchInput.addEventListener('input', handleSearch);
    
    playlistBtns.forEach(btn => {
        btn.addEventListener('click', handlePlaylistChange);
    });
    
    // Set initial volume
    audioPlayer.volume = 0.7;
}

// Play/Pause Toggle
function togglePlay() {
    if (audioPlayer.src === '') {
        loadSong(player.currentIndex);
    }
    
    if (player.isPlaying) {
        audioPlayer.pause();
        player.isPlaying = false;
        playBtn.textContent = '▶️';
    } else {
        audioPlayer.play();
        player.isPlaying = true;
        playBtn.textContent = '⏸️';
    }
}

// Load Song
function loadSong(index) {
    const song = player.playlist[index];
    if (!song) return;
    
    player.currentIndex = index;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    
    // Simulate loading audio (in a real app, you'd have actual audio URLs)
    // For demonstration, we'll use a data URL or local file
    // audioPlayer.src = `audio/${song.id}.mp3`;
    
    updateActiveSong();
}

// Previous Song
function previousSong() {
    if (player.currentIndex > 0) {
        player.currentIndex--;
    } else {
        player.currentIndex = player.playlist.length - 1;
    }
    
    audioPlayer.currentTime = 0;
    loadSong(player.currentIndex);
    
    if (player.isPlaying) {
        audioPlayer.play();
    }
}

// Next Song
function nextSong() {
    if (player.currentIndex < player.playlist.length - 1) {
        player.currentIndex++;
    } else {
        player.currentIndex = 0;
    }
    
    audioPlayer.currentTime = 0;
    loadSong(player.currentIndex);
    
    if (player.isPlaying) {
        audioPlayer.play();
    }
}

// Handle Song End
function handleSongEnd() {
    nextSong();
    if (player.isPlaying) {
        audioPlayer.play();
    }
}

// Seek Audio
function seekAudio() {
    const seekTime = (progressInput.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Update Progress
function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = progress + '%';
        progressInput.value = progress;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
}

// Update Duration
function updateDuration() {
    durationDisplay.textContent = formatTime(audioPlayer.duration || 0);
}

// Format Time
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Volume Control
function handleVolumeChange() {
    const volume = volumeControl.value / 100;
    audioPlayer.volume = volume;
    volumePercent.textContent = volumeControl.value + '%';
}

// Handle Playlist Change
function handlePlaylistChange(e) {
    playlistBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const category = e.target.dataset.category;
    player.currentCategory = category;
    
    if (category === 'all') {
        player.playlist = [...musicLibrary];
    } else if (category === 'favorites') {
        player.playlist = player.favorites.length > 0 
            ? player.favorites 
            : musicLibrary.filter(song => 
                player.favorites.some(fav => fav.id === song.id)
            );
    } else {
        player.playlist = musicLibrary.filter(song => song.category === category);
    }
    
    player.currentIndex = 0;
    renderPlaylist();
    loadSong(0);
}

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        // Reset to current category
        if (player.currentCategory === 'all') {
            player.playlist = [...musicLibrary];
        } else if (player.currentCategory === 'favorites') {
            player.playlist = player.favorites.length > 0 ? player.favorites : [];
        } else {
            player.playlist = musicLibrary.filter(song => song.category === player.currentCategory);
        }
    } else {
        // Filter based on search term
        let basePlaylist = player.currentCategory === 'all' 
            ? musicLibrary 
            : musicLibrary.filter(song => song.category === player.currentCategory);
        
        if (player.currentCategory === 'favorites') {
            basePlaylist = player.favorites;
        }
        
        player.playlist = basePlaylist.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
    }
    
    player.currentIndex = 0;
    renderPlaylist();
    if (player.playlist.length > 0) {
        loadSong(0);
    }
}

// Render Playlist
function renderPlaylist() {
    if (player.playlist.length === 0) {
        songList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎵</div>
                <p>No songs found</p>
            </div>
        `;
        return;
    }
    
    songList.innerHTML = player.playlist.map((song, index) => {
        const isFavorite = player.favorites.some(fav => fav.id === song.id);
        return `
            <div class="song-item ${index === player.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="song-item-info">
                    <div class="song-item-title">${song.title}</div>
                    <div class="song-item-artist">${song.artist} • ${formatTime(song.duration)}</div>
                </div>
                <span class="song-item-favorite ${isFavorite ? 'favorited' : ''}" data-id="${song.id}">
                    ${isFavorite ? '❤️' : '🤍'}
                </span>
            </div>
        `;
    }).join('');
    
    // Add event listeners to song items
    document.querySelectorAll('.song-item').forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('song-item-favorite')) {
                player.currentIndex = index;
                loadSong(index);
                audioPlayer.play();
                player.isPlaying = true;
                playBtn.textContent = '⏸️';
            }
        });
    });
    
    // Add event listeners to favorite buttons
    document.querySelectorAll('.song-item-favorite').forEach(favorite => {
        favorite.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(favorite.dataset.id));
        });
    });
}

// Toggle Favorite
function toggleFavorite(songId) {
    const song = musicLibrary.find(s => s.id === songId);
    const favoriteIndex = player.favorites.findIndex(s => s.id === songId);
    
    if (favoriteIndex > -1) {
        player.favorites.splice(favoriteIndex, 1);
    } else {
        player.favorites.push(song);
    }
    
    renderPlaylist();
}

// Update Active Song Display
function updateActiveSong() {
    document.querySelectorAll('.song-item').forEach((item, index) => {
        if (index === player.currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
