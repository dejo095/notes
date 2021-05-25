import React from 'react'
import { db } from '../firebase';
import firebase from 'firebase';
import moment from 'moment';

import styled from 'styled-components';
import { VscTrash } from 'react-icons/vsc';

function Note(props) {

    const createdOn = moment(props.noteData.timestamp.toDate().toLocaleString()).format('LLL');
    const currentDate = new Date();
    const age = Number(moment(currentDate).diff(createdOn, 'days'));

    const handleOnClick = (e) => {
        e.
        preventDefault();

        db.
        collection('notes').
        doc(props.noteData.id).
        delete();
    }

    return (
        <NoteDiv>
            <span>{props.noteData.content}</span>
            <div className="note-footer">
                <small>added {age} days ago</small>
                <small className="deadline">deadline</small>
                <VscTrash onClick={handleOnClick} className="delete-icon" size="1.3em" />
            </div>
        </NoteDiv>
    )
}

export default Note

const NoteDiv = styled.div`
    background-color: #FFC153;
    border-radius: 10px;
    padding: .8rem;
    min-height:100px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    white-space: pre-wrap;
    border-color: rgba(249, 249, 249, 0.8);

    &:hover {
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }

    span {
        overflow-y: auto;
        max-height: 100px;
    }

    .note-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;

        small {
            font-size: x-small;
            color: black;
        }

        .delete-icon {
            cursor:pointer;
            color: #353b48;

            &:hover {
                transform: scale(1.3);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            }
        }
    }
`