import NotesList from "./components/NotesList";
import Search from "./components/Search";
import { nanoid } from 'nanoid';
import { useState } from "react";

function App() {

  const [ notes, setNotes ] = useState([
    {
        id: nanoid(),
        text: 'My first note',
        date: "15/04/2021"
    },
    {
        id: nanoid(),
        text: 'My second note',
        date: "05/01/2021"
    }
  ]);

  const [ searchText, setSearchText ] = useState('');

  const addNote = (text) => {
    const date = new Date().toLocaleDateString();
    const newNote = {
      id: nanoid(),
      text,
      date
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id != id);
    setNotes(newNotes);
  }

  return (
    <div className="container">
      <Search handleSearchNotes={setSearchText} />
      <NotesList 
        notes={notes.filter(note => note.text.toLowerCase().includes(searchText))} 
        handleAddNote={addNote} 
        handleDeleteNote={deleteNote} 
      />
    </div>
  );
}

export default App;
