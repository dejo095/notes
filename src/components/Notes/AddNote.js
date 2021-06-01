import React, { useState } from 'react';
import { db } from '../../firebase';
import firebase from 'firebase/app';
import useStore from '../../store';

import Datepicker from './Datepicker/Datepicker';
import EncryptCheckbox from './Checkbox/EncryptCheckbox';

import './note.css';

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
    <div className="note new">
      <textarea
        value={noteInput}
        onChange={handleChange}
        rows="7"
        placeholder="Type to add new note"
      />
      <div className="content">
        <div className="options">
          <EncryptCheckbox />
          <small>Set Deadline</small>
        </div>
        <small>
          <strong>{noteMaxChars - Number(noteInput.length)}</strong> chars remaining
        </small>
        {/* <Datepicker /> */}
      </div>
      <div className="footer">
        <small></small>
        <button disabled={!valid} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddNote;
