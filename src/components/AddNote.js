import React, { useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase/app';
import useStore from '../store';

import styled from 'styled-components';
import CustomDatepicker from './CustomDatepicker';
import CustomCheckbox from './CustomCheckbox';

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
      <MidContent>
        <div className="options">
          <CustomCheckbox />
          <small>Set Deadline</small>
        </div>
        <small>
          <strong>{noteMaxChars - Number(noteInput.length)}</strong> chars remaining
        </small>
        {/* <CustomDatepicker /> */}
      </MidContent>
      <NoteFooter>
        <small></small>
        <Button disabled={!valid} onClick={handleSubmit}>
          Save
        </Button>
      </NoteFooter>
    </AddNoteDiv>
  );
}

export default AddNote;

const AddNoteDiv = styled.div`
  background-color: ${props => props.theme.noteBack};
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
    background-color: ${props => props.theme.addNewNoteBack};
  }
`;

const NoteFooter = styled.div`
  color: #505050;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const MidContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    small {
      margin: 0px auto;
    }
  }
`;

const Textarea = styled.textarea`
  background-color: ${props => props.theme.addNewNoteBack};
  /* border: none; */
  resize: none;
  font-size: large;

  &:focus {
    outline: none;
  }
`;
