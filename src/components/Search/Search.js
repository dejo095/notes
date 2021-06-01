import React, { useState } from 'react';
import useStore from '../../store';
import { MdSearch, MdHighlightOff } from 'react-icons/md';

import './search.css';

function Search() {
  const setFilter = useStore(state => state.setFilter);
  const [filterValue, setFilterValue] = useState('');

  const handleChange = e => {
    setFilter(e.target.value);
    setFilterValue(e.target.value);
  };

  const handleReset = e => {
    e.preventDefault();
    setFilterValue('');
    setFilter('');
  };

  return (
    <div className="search">
      <MdSearch className="search-icon" size="1.5em" />
      <input
        type="text"
        value={filterValue}
        placeholder="Type to filter notes..."
        onChange={handleChange}
      />
      <MdHighlightOff onClick={handleReset} className="close-icon" size="1.3em" />
    </div>
  );
}

export default Search;
