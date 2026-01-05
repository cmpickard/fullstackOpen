const express = require('express');
const PORT = 3001;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

function findContactById(id) {
  return phonebook.find(contact => contact.id === id);
}

function findContactByName(name) {
  return phonebook.find(contact => contact.name === name);
}

function findContactIdxByName(name) {
  return phonebook.findIndex(contact => contact.name === name);
}

class IDGenerator {
  constructor() {
    this.nextId = Math.max(...phonebook.map(el => Number(el.id))) + 1;
  }

  next() {
    this.nextId++;
    return String(this.nextId);
  }
}

const idGen = new IDGenerator();

// homepage
app.get('/', (_, response) => {
  response.send('<h1>Hello world!</h1>');
});

// info page
app.get('/info', (_, response) => {
  let now = new Date();
  response.send(`<p>The phonebook includes ${phonebook.length} contacts</p>\n${now}}`);
});


// API routes
app.get('/api/contacts', (_, response) => {
  response.send(JSON.stringify(phonebook));
});

app.get('/api/contacts/:id', (request, response) => {
  let contact = findContactById(request.params.id);
  if (!contact) {
    response.status(404).send({ error: 'contact not found'});
  } else {
    response.send(JSON.stringify(contact));
  }
});

app.post('/api/contacts', (request, response) => {
  let data = request.body;
  if (!data.name || !data.number) response.json({ error: 'invalid input' });

  let currIdx = findContactIdxByName(data.name);

  if (currIdx > -1) {
    phonebook[currIdx].number = data.number;
    response.json(findContactByName(data.name));
  } else {
    let newContact = {
      name: data.name,
      number: data.number,
      id: idGen.next(),
    };

    phonebook.push(newContact);
    response.send(newContact);
  }
});

app.delete('/api/contacts/:id', (request, response) => {
  let id = request.params.id;
  let contact = findContactById(id);
  if (!contact) {
    response.json({ error: 'contact has already been deleted' });
  } else {
    phonebook = phonebook.filter(contact => contact.id !== id);
    response.status(202).end();
  }
});