import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import notesStore from '../store/index'

import Navbar from './Navbar';
import Search from './Search';
import NotesList from './NotesList';
import Alert from '@material-ui/lab/Alert';

function Dashboard() {

  const [error, setError ] = useState('');
  const { setNotes, currentUser } = notesStore();
  
  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Navbar />
      <Search />
      { error && <Alert severity="error">{ error }</Alert> }
      <NotesList />
    </div>
  )
}

export default Dashboard
