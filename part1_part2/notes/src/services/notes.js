import axios from 'axios'
const baseURL = 'http://localhost:3001/notes';

function getAll() {
  return axios.get(baseURL).then(response => response.data);
}

function postNew(newNote) {
  return axios.post(baseURL, newNote).then(response => response.data);
}

function updateNote(note) {
  return axios.put(`${baseURL}/${note.id}`, note).then(response => response.data);
}

export default { getAll, postNew, updateNote }