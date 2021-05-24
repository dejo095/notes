import React from 'react'
import { MdSearch, MdHighlightOff } from 'react-icons/md';
import useStore from '../store';
import styled from 'styled-components';

function Search() {

    const { filter, setFilter } = useStore();

    return (
        <SearchBar>
            <MdSearch className="search-icon" size="1.5em" />
            <Input 
                value={filter} 
                onChange={ e => setFilter(e.target.value) } 
                type="text" 
                placeholder="Type to filter notes..." 
            />
            <MdHighlightOff onClick={ e => setFilter('') } className="close-icon" size="1.3em" />
        </SearchBar>
    )
}

export default Search

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(233, 233, 233);
    border-radius: 10px;
    padding: 5px;
    margin: 10px 10px;

    .close-icon:hover {
        transform: scale(1.3);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        cursor: pointer;
    }
`

const Input = styled.input`
    margin-left: 12px;
    font-size: medium;
    width: 100%;
    border: none;
    background-color: rgb(233, 233, 233);
    
    &:focus {
        outline: none;
    }
`