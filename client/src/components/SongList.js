import React from 'react';

function SongList({ songs, currentSongId, favorites, onSongSelect, onToggleFavorite }) {
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isFavorite = (songId) => favorites.some(fav => fav.id === songId);

  if (songs.length === 0) {
    return (
      <div className="playlist-display">
        <h3>Current Playlist</h3>
        <div className="empty-state">
          <div className="empty-state-icon">🎵</div>
          <p>No songs found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playlist-display">
      <h3>Current Playlist ({songs.length})</h3>
      <div className="song-list">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className={`song-item ${currentSongId === song.id ? 'active' : ''}`}
            onClick={() => onSongSelect(index)}
          >
            <div className="song-item-info">
              <div className="song-item-title">{song.title}</div>
              <div className="song-item-artist">
                {song.artist} • {formatTime(song.duration)}
              </div>
            </div>
            <button
              className={`song-item-favorite ${isFavorite(song.id) ? 'favorited' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(song);
              }}
              title={isFavorite(song.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(song.id) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
