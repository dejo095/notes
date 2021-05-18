import React from 'react';
import Note from './Note';
import AddNote from '../components/AddNote';

function NotesList({notes, handleAddNote, handleDeleteNote}) {
    return (
        <div>
            <div className="notes-list">
                <AddNote 
                    handleAddNote={handleAddNote} 
                    />
                {
                    notes
                    .map(note => <Note
                        key={note.id} 
                        id={note.id} 
                        text={note.text} 
                        date={note.date} 
                        handleDeleteNote={handleDeleteNote} 
                            />
                        )
                }
            </div>
        </div>
    )
}

export default NotesList