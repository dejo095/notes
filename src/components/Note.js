import React, { useState } from 'react'
import { VscTrash} from 'react-icons/vsc';

function Note({id, text, date, handleDeleteNote}) {

    const handleDelete = () => {
        handleDeleteNote(id);
    }

    return (
        <div>
            <div className="note">
                <span>{text}</span>
                <div className="note-footer">
                    <small>{date}</small>
                    <VscTrash onClick={handleDelete} className="delete-icon" size="1.3em" />
                </div>
            </div>
        </div>
    )
}

export default Note
