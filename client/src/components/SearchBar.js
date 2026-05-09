import React from 'react';

function SearchBar({ searchQuery, onSearch }) {
  return (
    <div className="search-section">
      <input
        type="text"
        className="search-bar"
        placeholder="Search songs, artists..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
