import axios from 'axios'
const BASE_URL = 'http://localhost:3001/contacts/'

function getAll() {
  return axios.get(BASE_URL).then(response => response.data);
}

function addNew(contact) {
  return axios.post(BASE_URL, contact).then(response => response.data);
}

function deleteContact(id) {
  return axios.delete(BASE_URL + id).then(
    (response) => response,
    () => new Error('That contact has already been removed') ); 
}

function patchContact(id, number) {
  return axios.patch(BASE_URL + id, {number: number}).then(
    (response) => response.data,
    () => new Error("Something went wrong updating the contact")
  );
}

export default { getAll, addNew, deleteContact, patchContact }