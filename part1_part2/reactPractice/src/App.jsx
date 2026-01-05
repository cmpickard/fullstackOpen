import {useState, useEffect, useContext, createContext} from 'react'
import TodoServices from '/services/todoServices'
import todoServices from '../services/todoServices';

const Secret = createContext('default secret');

function App() {
  // event handlers
  function handleSubmit(event) {
    event.preventDefault();
    setId(nextId + 1);
    todoServices.addNew(newDesc)
      .then(response => response.json())
      .then(data => setTodos(todos.concat(data)));

    setDesc('');
  }

  function handleChange(event) {
    let target = event.target;
    let newVal = target.value;
    setDesc(newVal);
  }

  // state Hooks
  let [todos, setTodos] = useState([]);
  let [newDesc, setDesc] = useState('');
  let [nextId, setId] = useState(0);

  // effect Hook for loading Todos
  function getAllTodos() {
    TodoServices.getAll()
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTodos(data);
      });
  }

  useEffect(getAllTodos, []);
  
  return (
    <>
      <Secret.Provider value="password">
        <TodoForm newDesc={newDesc} handleSubmit={handleSubmit} handleChange={handleChange}/>
        <DisplayTodos todos={todos}/>
      </ Secret.Provider>
      <p>{useContext(Secret)}</p>
    </>
  )
}

function TodoForm({newDesc, handleSubmit, handleChange}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='description'>New todo description: </label>
      <input type='text' id='description' value={newDesc} onChange={handleChange}/>
      <input type='submit'/>
    </form>
  )
}

function DisplayTodos({todos}) {
  return (
    <ul><h1>My Todos</h1>
      {todos.map(todo => <li key={todo.id}>{todo.description}</li>)}
      <li>The secret is {useContext(Secret)}</li>
    </ul>
  )
}

export default App