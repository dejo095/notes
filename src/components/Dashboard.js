import React, { useState } from 'react'

import Navbar from './Navbar';
import Search from './Search';
import NotesList from './NotesList';
import Alert from '@material-ui/lab/Alert';

function Dashboard() {

  const [error, setError ] = useState('');

  return (
    <div>
      <Navbar />
      <Search />
      { error && <Alert severity="error">{ error }</Alert> }
      dashboard
      <NotesList />
    </div>
  )
}

export default Dashboard
