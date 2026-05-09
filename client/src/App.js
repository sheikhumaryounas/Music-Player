import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import PlayerDisplay from './components/PlayerDisplay';
import PlayerControls from './components/PlayerControls';
import ProgressBar from './components/ProgressBar';
import VolumeControl from './components/VolumeControl';
import SearchBar from './components/SearchBar';
import PlaylistSidebar from './components/PlaylistSidebar';
import SongList from './components/SongList';

function App() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);

  // Initialize - Fetch data from backend
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [songsRes, categoriesRes] = await Promise.all([
        axios.get('/api/songs'),
        axios.get('/api/categories')
      ]);
      setPlaylist(songsRes.data);
      setCategories(categoriesRes.data);
      if (songsRes.data.length > 0) {
        setCurrentSong(songsRes.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch songs by category
  const fetchByCategory = async (category) => {
    try {
      const response = await axios.get(`/api/songs/category/${category}`);
      setPlaylist(response.data);
      setCurrentIndex(0);
      setCurrentCategory(category);
      setSearchQuery('');
      if (response.data.length > 0) {
        setCurrentSong(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchByCategory(currentCategory);
      return;
    }

    try {
      const response = await axios.get(`/api/search?q=${query}`);
      setPlaylist(response.data);
      setCurrentIndex(0);
      if (response.data.length > 0) {
        setCurrentSong(response.data[0]);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, playlist]);

  // Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Previous song
  const playPrevious = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = playlist.length - 1;
    }
    setCurrentIndex(newIndex);
    setCurrentSong(playlist[newIndex]);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Next song
  const playNext = () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= playlist.length) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
    setCurrentSong(playlist[newIndex]);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Seek
  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Play song from list
  const playSong = (index) => {
    setCurrentIndex(index);
    setCurrentSong(playlist[index]);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle favorite
  const toggleFavorite = (song) => {
    const isFavorite = favorites.some(fav => fav.id === song.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎵 My Music Player</h1>
      </header>

      <div className="main-content">
        <PlaylistSidebar
          categories={categories}
          currentCategory={currentCategory}
          onCategorySelect={fetchByCategory}
          favoriteCount={favorites.length}
        />

        <div className="center-content">
          <PlayerDisplay currentSong={currentSong} />

          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />

          <PlayerControls
            isPlaying={isPlaying}
            onPlay={togglePlay}
            onPrevious={playPrevious}
            onNext={playNext}
          />

          <VolumeControl
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />

          <SongList
            songs={playlist}
            currentSongId={currentSong?.id}
            favorites={favorites}
            onSongSelect={playSong}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default App;
