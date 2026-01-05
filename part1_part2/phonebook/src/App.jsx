import { useState, useEffect } from 'react'
import fetchContact from './services/fetchContact.js'

function Header({text}) {
  return <h1>{text}</h1>
}

function Message({message, error}) {
  let messageStyles = {
    backgroundColor: error ? 'red' : 'lightgray',
    height: '60px',
    width: '400px',
    marginBottom: '15px',
    textAlign: 'center',
    lineHeight: '55px',
    fontSize: '20px',
    borderColor: 'black',
    borderWidth: '2px',
    borderStyle: 'solid',
    fontFamily: 'Helvetica',
    visibility: message ? 'visible' : 'hidden',
  };

  return (
    <div style={messageStyles}>
      {message}
    </div>
  )
}

function ContactList({contacts, deleteHandler}) {
  if (!contacts) {
    return <ul></ul>
  }

  let listItems = contacts.map(contact => {
    return  <li key={contact.id}> {contact.name}  |  {contact.number}
              <button id={contact.id} onClick={deleteHandler}>Delete</button>
            </li>
  })
  
  return (
    <ul>
      {listItems}
    </ul>
  )
}

function AddContact({handleSubmit, handleChange, newName, newNumber}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-name'>Name:</label>
      <input type='text' onChange={handleChange} id='new-name' value={newName}/>

      <label htmlFor='new-number'>Phone Number:</label>
      <input onChange={handleChange} type='tel' id='new-number' value={newNumber}/>

      <input type='submit' value="Add Contact"/>
    </form>
  )
}

function App() {
  // state
  let [contacts, setContacts] = useState(null);
  let [newName, setName] = useState('');
  let [newNumber, setNumber] = useState('');
  let [message, setMessage] = useState('');
  let [error, setError] = useState(false);

  // event handlers
  function clearMessage() {
    if (message !== '') {
      setMessage('');
    }

    if (error === true) {
      setError(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let newContact = { name: newName, number: newNumber };
    let previousContact = {};
    contacts.forEach(contact => {
      if (contact.name === newContact.name) previousContact = contact;
    });

    if (previousContact.number === newContact.number) {
      alert("That contact is already in the phonebook!");
    } else if (previousContact.id) {
      // patch contact
      (async () => {
        let returnContact = await fetchContact.patchContact(previousContact.id,
                                                            newContact.number);
        
        if (returnContact instanceof Error) {
          setMessage(returnContact.message);
          setError(true);
        } else {
          setContacts(contacts.map(contact => {
            return (contact.id === returnContact.id) ? returnContact : contact;
          }));
          setName("");
          setNumber("");
          setMessage(`Contact ${returnContact.name} successfully updated`);
        }
      })()
    } else {
      // add new
      (async () => {
        let returnContact = await fetchContact.addNew(newContact);
        setContacts(contacts.concat(returnContact));
        setName("");
        setNumber("");
        setMessage(`Contact ${returnContact.name} successfully added`);
      })();
    }
  }

  function deleteHandler(event) {
    let id = event.target.id;
    (async () => {
      let result = await fetchContact.deleteContact(id);
      if (result instanceof Error) {
        setMessage(result.message);
        setError(true);
        setContacts(contacts.filter(contact => contact.id !== id));
      } else {
        setContacts(contacts.filter(contact => contact.id !== id));
        setMessage(`Contact successfully deleted`);
      }
    })();
    
  }

  // initial retrieve database callback
  let getDB = function getDB() {
    (async () => {
      let data = await fetchContact.getAll();
      setContacts(data);
    })()
  }

  // initial retrieval
  useEffect(getDB, []);

  function handleChange(event) {
    let target = event.target;
    
    let newVal = target.value;
    if (target.id === 'new-name') {
      setName(newVal);
    } else if (target.id === 'new-number') {
      setNumber(newVal);
    }
  }

  return (
    <div onClick={clearMessage}>
      <Header text='Phonebook'/>
      <Message message={message} error={error}/>
      <AddContact handleSubmit={handleSubmit} handleChange={handleChange} newNumber={newNumber} newName={newName}/>
      <Header text='Numbers'/>
      <ContactList contacts={contacts} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App
