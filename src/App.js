import { useEffect } from "react";
import { db } from "./firebase";
import notesStore from "./store";
import styled from 'styled-components';

import Navbar from "./components/Navbar";
import NotesList from "./components/NotesList";
import Search from "./components/Search";

function App() {

  const _setNotes = notesStore(state => state.setNotes);
  
  useEffect(() => {
    db.collection('notes')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        _setNotes(snapshot.docs.map(doc => {
          return {
            id: doc.id, 
            content: doc.data().content,
            timestamp: doc.data().timestamp,
            state: doc.data().active
          }
        }))
      })
  }, []);

  return (
    <Container>
      <Navbar />
      <Search />
      <NotesList />
    </Container>
  );
}

export default App;

const Container = styled.main`
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
`