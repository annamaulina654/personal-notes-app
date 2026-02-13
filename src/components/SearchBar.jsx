import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

function SearchBar({ keyword, keywordChange }) {
  return (
    <div className="search-bar">
      <MdSearch className="search-icon" />
      <input
        type="text"
        placeholder="Cari catatan berdasarkan judul..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;