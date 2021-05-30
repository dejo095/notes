import React from 'react';
import { db } from '../firebase';
import moment from 'moment';

import styled from 'styled-components';
import { VscTrash } from 'react-icons/vsc';

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
    <NoteDiv>
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
    </NoteDiv>
  );
}

export default Note;

const NoteDiv = styled.div`
  background-color: ${props => props.theme.noteBack};
  border-radius: 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  box-sizing: border-box;

  &:hover {
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  }

  .header {
    color: #7b7b7b;
    background-color: rgba(247, 162, 8, 0.6);
    min-height: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: x-small;
    font-weight: bold;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }

  .content {
    color: #505050;
    flex: 1;
    height: 100%;
    overflow-y: hidden;
    padding: 6px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    min-height: 24px;
    padding-right: 2px;

    .delete-icon {
      cursor: pointer;
      color: #353b48;
      padding-left: 12px;

      &:hover {
        transform: scale(1.3);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
  }
`;
