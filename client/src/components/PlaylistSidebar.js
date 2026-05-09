import React from 'react';

function PlaylistSidebar({ categories, currentCategory, onCategorySelect, favoriteCount }) {
  return (
    <aside className="sidebar">
      <div className="playlist-section">
        <h3>Playlists</h3>
        <div className="playlist-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`playlist-btn ${currentCategory === category ? 'active' : ''}`}
              onClick={() => onCategorySelect(category)}
            >
              {category === 'rock' && '🎸'}
              {category === 'pop' && '🎤'}
              {category === 'jazz' && '🎷'}
              {category === 'classical' && '🎻'}
              {category === 'all' && '🎵'}
              {category === 'favorites' && '❤️'}
              {' '}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
          {favoriteCount > 0 && (
            <div className="favorite-badge">{favoriteCount} favorites</div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default PlaylistSidebar;
