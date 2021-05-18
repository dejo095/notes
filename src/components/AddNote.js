import React, { useState } from 'react'

function AddNote({ handleAddNote }) {

    const [ noteText, setNoteText ] = useState('');
    
    const charLimit = 200;

    const handleChange = (e) => {
        if(charLimit - e.target.value.length >= 0) {
            setNoteText(e.target.value);
        }
    }

    const handleSave = () => {
        if(noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    const handleKeypress = (e) => {
        if(e.charCode == 13) {
            console.log('pressed enter');
        }
    }

    return (
        <div className="note new">
            <textarea value={noteText} onChange={handleChange} cols="10" rows="8" placeholder="Type to add new note"></textarea>
            <div className="note-footer">
                <small>{charLimit - noteText.length} Remaining</small>
                <button onKeyPress={handleKeypress} onClick={handleSave} className="save">Save</button>
            </div>
        </div>
    )
}

export default AddNote
