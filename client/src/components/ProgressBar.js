import React from 'react';

function ProgressBar({ currentTime, duration, onSeek }) {
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  return (
    <div className="progress-section">
      <span>{formatTime(currentTime)}</span>
      <div className="progress-bar" onClick={handleProgressChange}>
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <input
          type="range"
          className="progress-input"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => onSeek((e.target.value / 100) * duration)}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressBar;
