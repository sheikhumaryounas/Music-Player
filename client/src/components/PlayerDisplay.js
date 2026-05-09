import React from 'react';

function PlayerDisplay({ currentSong }) {
  return (
    <div className="player-display">
      <div className="album-art">
        <div className="album-placeholder">🎵</div>
      </div>
      <div className="song-info">
        <h2>{currentSong?.title || 'Select a song'}</h2>
        <p>{currentSong?.artist || 'Artist Name'}</p>
      </div>
    </div>
  );
}

export default PlayerDisplay;
