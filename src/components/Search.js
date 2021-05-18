import React from 'react'
import { MdSearch } from 'react-icons/md';

function Search({handleSearchNotes}) {

    const handleChange = (e) => {
        handleSearchNotes(e.target.value);
    }

    return (
        <div className="search">
            <MdSearch className="search-icons" size="1.3em" />
            <input onChange={handleChange} type="text" placeholder="Type to search notes..." />
        </div>
    )
}

export default Search
