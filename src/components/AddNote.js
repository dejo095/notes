import React, { useState } from 'react'
import { db } from '../firebase';
import firebase from 'firebase';
import useStore from '../store';
import useCredentialsStore from '../credentialsStore';
import styled from 'styled-components';

function AddNote() {
    
    const noteMinChars = useStore(state => state.noteMinChars);
    const noteMaxChars = useStore(state => state.noteMaxChars);
    const currentUser = useCredentialsStore(state => state.currentUser);

    const [ noteInput, setNoteInput ] = useState('');
    const [ valid, setValid ] = useState(false);
    
    const handleChange = (e) => {
        if(e.target.value.length >= noteMinChars) {
            setValid(true);
        } else {
            setValid(false);
        }
        if(e.target.value.length <= noteMaxChars) {
            setNoteInput(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        db.collection('notes').add({
            owner: currentUser.uid,
            content: noteInput,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setNoteInput('');
        setValid(false);
    }

    return (
        <NoteDiv className="new">
            <Textarea value={noteInput} onChange={handleChange} cols="10" rows="4" placeholder="Type to add new note"></Textarea>
            <div className="note-footer">
                <small>{ noteMaxChars - Number(noteInput.length) } characters remaining</small>
                <Button disabled={!valid} onClick={handleSubmit} className="save">Save</Button>
            </div>
        </NoteDiv>
    )
}

export default AddNote

const NoteDiv = styled.div`
    background-color: #FFC153;
    border-radius: 10px;
    padding: 1rem;
    min-height:100px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    white-space: pre-wrap;

    &.new {
        background-color: #47B39D;
    }
    
    .note-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;        
    }
`

const Button = styled.button`
    background-color: #e1e1e1d2;
    border: none;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;

    &:hover {
        background-color: #ffffff;
        cursor: pointer;
        transform: scale(1.2);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }
`

const Textarea = styled.textarea`
    background-color: #47B39D;
    border: none;
    resize: none;
    font-size: large;

    &:focus {
        outline: none;
    }
`