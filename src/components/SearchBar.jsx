import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import LocaleContext from '../contexts/LocaleContext';
import content from '../utils/content';

function SearchBar({ keyword, keywordChange }) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="search-bar">
      <MdSearch className="search-icon" />
      <input
        type="text"
        placeholder={content[locale].home.searchPlaceholder}
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