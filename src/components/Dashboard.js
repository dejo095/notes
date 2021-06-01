import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import useStore from '../store';
import Alert from '@material-ui/lab/Alert';

import Navbar from './Navbar/Navbar';
import Search from './Search/Search';
import NotesList from './Notes/NotesList';

import './dashboard.css';

function Dashboard() {
  const [error, setError] = useState('');

  const setNotes = useStore(state => state.setNotes);
  const currentUser = useStore(state => state.currentUser);

  useEffect(() => {
    try {
      setError('');
      db.collection('notes')
        .where('owner', '==', currentUser.uid)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setNotes(
            snapshot.docs.map(doc => {
              return {
                id: doc.id,
                content: doc.data().content,
                timestamp: doc.data().timestamp,
                deadline: doc.data().deadline,
              };
            }),
          );
        });
    } catch (error) {
      setError('Error while loading notes from db!');
    }
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <Search />
      {error && <Alert severity="error">{error}</Alert>}
      <NotesList />
    </div>
  );
}

export default Dashboard;
