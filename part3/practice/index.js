const express = require('express');
let app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

let getNextId = (() => {
  let nextId = 3;

  return () => {
    nextId++;
    return String(nextId);
  };
})();

app.get('/', (_, response) => {
  response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (_, response) => {
  response.json(notes);
});

app.get(`/api/notes/:id`, (request, response) => {
  let id = request.params.id;
  let note = notes.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = 'No such resource exists';
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id;
  notes = notes.filter(note => note.id !== id);

  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  let newNote = req.body;
  if (newNote.content !== '') {
    newNote = {
      content: newNote.content,
      important: newNote.important || false,
      id: getNextId()
    };
    notes.push(newNote);
    res.json(newNote);
  } else {
    res.status(400).json({ error: 'note must have content' });
  }

});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});