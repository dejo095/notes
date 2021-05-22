import React from 'react';
import notesStore from '../store/index';
import styled from 'styled-components';

import Note from './Note';
import AddNote from '../components/AddNote';

function NotesList() {

    const { filter, notes } = notesStore();

    return (
        <List>
            <AddNote />

            { notes.filter(note => note.content.toLowerCase().includes(filter))
                    .map(note => <Note noteData={note} /> )}
                    
        </List>
    )
}

export default NotesList

const List = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin: 10px 10px;
`