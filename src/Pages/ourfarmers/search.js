import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchbarstyles.css';

const Searchbar = ({ onSearch, searchTerm, setSearchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="searchbar_wrap">
      <div style={{flex: '2'}}>

      </div>
      <div
        className={`searchbar_input_wrapper ${
          isFocused ? 'glow' : 'permanent'
        }`}
      >
        <SearchIcon className="searchbar_icon" />
        <input
          type="text"
          placeholder="חפשו משק ספציפי!"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default Searchbar;
