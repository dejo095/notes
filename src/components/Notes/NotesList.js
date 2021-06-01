import React from 'react';

import useStore from '../../store';
import Note from './Note';
import AddNote from './AddNote';

import './note.css';

function NotesList() {
  const filter = useStore(state => state.filter);
  const notes = useStore(state => state.notes);
  const deadline = useStore(state => state.deadline);

  return (
    <div className="notes-list">
      <AddNote />

      {notes
        .filter(note => note.content.toLowerCase().includes(filter))
        .map(note => (
          <Note key={note.id} noteData={note} />
        ))}
    </div>
  );
}

export default NotesList;
