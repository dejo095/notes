import React from 'react';
import useStore from '../store';

import styled from 'styled-components';
import Note from './Note';
import AddNote from '../components/AddNote';

function NotesList() {
  const filter = useStore(state => state.filter);
  const notes = useStore(state => state.notes);
  const deadline = useStore(state => state.deadline);

  return (
    <List>
      <AddNote />

      {notes
        .filter(note => note.content.toLowerCase().includes(filter))
        .map(note => (
          <Note key={note.id} noteData={note} />
        ))}
    </List>
  );
}

export default NotesList;

const List = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 10px 10px;
`;
