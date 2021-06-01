import React from 'react';
import moment from 'moment';

import { db } from '../../firebase';
import { VscTrash } from 'react-icons/vsc';

import './note.css';

function Note(props) {
  const createdOn = moment(props.noteData.timestamp?.toDate().toLocaleString()).format('LLL');
  const currentDate = new Date();
  const age = Number(moment(currentDate).diff(createdOn, 'days'));

  const formattedDeadline = moment(props.noteData.deadline?.toDate().toLocaleString()).format(
    'LLL',
  );
  const expiresIn = Number(moment(formattedDeadline).diff(currentDate, 'days'));

  const handleOnClick = e => {
    e.preventDefault();

    db.collection('notes').doc(props.noteData.id).delete();
  };

  return (
    <div className="note">
      <div className="header">
        {age <= 0 ? <span>Added today</span> : <span>Added {age} days ago</span>}
        {expiresIn <= 0 || expiresIn == null || expiresIn == '' ? (
          <span></span>
        ) : (
          <span>Expiring in {expiresIn} days!</span>
        )}
      </div>
      <div className="content">
        <span>{props.noteData.content}</span>
      </div>
      <div className="footer">
        <VscTrash onClick={handleOnClick} className="delete-icon" size="1.3em" />
      </div>
    </div>
  );
}

export default Note;
