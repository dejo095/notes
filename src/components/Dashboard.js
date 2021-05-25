import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import useStore from '../store'

import styled from 'styled-components';
import Navbar from './Navbar';
import Search from './Search';
import NotesList from './NotesList';
import Alert from '@material-ui/lab/Alert';

function Dashboard() {

  const [ error, setError ] = useState('');

  const setNotes = useStore(state => state.setNotes);
  const currentUser = useStore(state => state.currentUser);
  
  useEffect(() => {
    try {
      setError('');
      db.collection('notes')
        .where('owner', '==', currentUser.uid)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setNotes(snapshot.docs.map(doc => {
            return {
              id: doc.id, 
              content: doc.data().content,
              timestamp: doc.data().timestamp,
            }
          }))
        })
    } catch (error) {
      setError('Error while loading notes from db!');
    }
  }, []);

  return (
    <DashPanel>
      <Navbar />
      <Search />
      { error && <Alert severity="error">{ error }</Alert> }
      <NotesList />
    </DashPanel>
  )
}

export default Dashboard

const DashPanel = styled.div`
  width: 100%;
`