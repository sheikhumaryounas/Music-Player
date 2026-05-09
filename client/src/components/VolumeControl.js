import React from 'react';

function VolumeControl({ volume, onVolumeChange }) {
  return (
    <div className="volume-section">
      <span>🔊</span>
      <input
        type="range"
        className="volume-slider"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(parseInt(e.target.value))}
      />
      <span className="volume-percent">{volume}%</span>
    </div>
  );
}

export default VolumeControl;
