class GenID {
  constructor() {
    this.nextID = 1;
  }

  create() {
    this.nextID++;
    return this.nextID;
  }
}

const idGenerator = new GenID();
const URL_BASE = 'http://localhost:3001/'

function getAll() {
  return fetch(URL_BASE + 'todos');
}

function addNew(description) {
  let newTodo = { description, id: idGenerator.create() };

  let options = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/JSON',
    },
    body: JSON.stringify(newTodo),
  };

  return fetch(URL_BASE + 'todos', options);
}

function deleteExisting(id) {
  let options = {
    method: 'DELETE'
  };

  return fetch(URL_BASE + `todos/${id}`, options);
}

export default { getAll, addNew, deleteExisting };