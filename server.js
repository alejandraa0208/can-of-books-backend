'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const BookModel = require('./BookModel.js');
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(cors());

mongoose.connect(MONGODB_URL);

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', async (request, response) => {
  try {
    let documents = await BookModel.find({});
    response.json(documents);
  } catch (e) {
    console.log('Books not loading', e);
    response.status(500).send(e);
  }
});

app.post('/books', async (request, reponse) => {
  try {
    const { title, description, status } = request.body;

    const newBook = new BookModel({
      title,
      description,
      status,
    });

    const savedBook = await newBook.save();
    response.status(201).json(savedBook);
  } catch (e) {
    console.log('Error creating book', e);
    response.status(500).send(e);
  }
});

app.delete('/books/:id', async (request, response) => {
  try {
    const bookId = request.params.id;

    const deletedBook = await BookModel.findByIdAndDelete(bookId);

    if (deletedBook) {
      response.json({ message: 'Book successfully deleted'});
    } else {
      response.status(404).json({ message: 'Book not found'});
    }
  } catch (e) {
    console.log('Error deleting book', e);
    response.status(500).send(e);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));