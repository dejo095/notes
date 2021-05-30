import React, { useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase';
import useStore from '../store';

import styled from 'styled-components';
import DatePicker from './DatePicker';

function AddNote() {
  const { noteMinChars, noteMaxChars, currentUser, deadline, setDeadline } = useStore();

  const [noteInput, setNoteInput] = useState('');
  const [valid, setValid] = useState(false);

  const handleChange = e => {
    if (e.target.value.length >= noteMinChars) {
      setValid(true);
    } else {
      setValid(false);
    }
    if (e.target.value.length <= noteMaxChars) {
      setNoteInput(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    let _deadline = null;
    if (deadline != null && deadline != '' && deadline.length > 0) {
      _deadline = firebase.firestore.Timestamp.fromDate(new Date(deadline));
    }

    db.collection('notes').add({
      owner: currentUser.uid,
      content: noteInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // deadline: _deadline,
    });

    setNoteInput('');
    setDeadline('');
    setValid(false);
  };

  return (
    <AddNoteDiv className="new">
      <Textarea
        value={noteInput}
        onChange={handleChange}
        rows="7"
        placeholder="Type to add new note"
      />
      <div className="note-footer">
        <small>
          <strong>{noteMaxChars - Number(noteInput.length)}</strong> chars remaining
        </small>
        <Button disabled={!valid} onClick={handleSubmit} className="save">
          Save
        </Button>
        {/* <DatePicker /> */}
      </div>
    </AddNoteDiv>
  );
}

export default AddNote;

const AddNoteDiv = styled.div`
  background-color: #ffc153;
  border-radius: 10px;
  padding: 6px;
  height: 100%;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-wrap;
  box-sizing: border-box;
  overflow-y: hidden;

  &.new {
    background-color: #47b39d;
  }

  .note-footer {
    color: #505050;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  background-color: #e1e1e1d2;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;

  &:hover {
    background-color: #ffffff;
    cursor: pointer;
    transform: scale(1.1);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  }
`;

const Textarea = styled.textarea`
  background-color: #47b39d;
  /* border: none; */
  resize: none;
  font-size: large;

  &:focus {
    outline: none;
  }
`;
