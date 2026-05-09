import React from 'react';

function PlayerControls({ isPlaying, onPlay, onPrevious, onNext }) {
  return (
    <div className="controls">
      <button className="control-btn" onClick={onPrevious} title="Previous">⏮️</button>
      <button
        className="control-btn play-btn"
        onClick={onPlay}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <button className="control-btn" onClick={onNext} title="Next">⏭️</button>
    </div>
  );
}

export default PlayerControls;
