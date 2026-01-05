import { useState, useEffect } from 'react'
import noteService from './services/notes'

function AddNote({handleSubmit, newContent, handleText, handleRadio, important}) {
  return (
    <div style={{borderSize: '1px', borderColor: 'gray', borderStyle: 'solid', padding: '5px', width: '250px'}}>
      <form onSubmit={handleSubmit}>
        <h1>Add New Note</h1>
        <label htmlFor='content'>Note: </label>
        <input type='text' value={newContent} onChange={handleText} id='content'/>
        <br/>
        <br/>
        <div>
          <label htmlFor='important'>Important</label>
          <input type='radio' name='import' id='important' value='true' checked={important === 'true'} onChange={handleRadio}/>
          <br/>
          <label htmlFor='notImportant'>Not Important </label>
          <input type='radio' name='import' id='notImportant' value='false' checked={important === 'false'} onChange={handleRadio}/>
        </div>
        <br/>
        <input type='submit'/>
      </form>
    </div>

  )
}

function DisplayNotes({notes}) {
  let noteList = notes.map(note => {
    if (note.important) {
      return <li key={note.id}><strong>{note.content}</strong></li>
    } else {
      return <li key={note.id}>{note.content}</li>
    }
  });

  return <ul>{noteList}</ul>
}

function App() {
  // event handlers
  function handleSubmit(event) {
    event.preventDefault();
    let newNote = {
      content: newContent,
      important: important === 'true' ? true : false,
    };

    (async () => {
      let data = await noteService.postNew(newNote);
      setNotes(notes.concat(data));
      setNewContent('');
    })()
  }

  function handleText(event) {
    setNewContent(event.target.value);
  }

  function handleRadio(event) {
    setImportant(event.target.value);
  }

  // initialize state
  let [notes, setNotes] = useState([]);
  let [newContent, setNewContent] = useState('');
  let [important, setImportant] = useState('false');

  // retrieve database
  function getDB() {
    (async () => {
      setNotes(await noteService.getAll());
    })();
  }

  useEffect(getDB, []);

  return (
    <>
      <AddNote
        handleSubmit={handleSubmit} newContent={newContent}
        handleText={handleText} handleRadio={handleRadio}
        important={important}/>
      <DisplayNotes notes={notes}/>
    </>
  )
}

export default App
