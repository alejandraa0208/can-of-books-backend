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

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.get('/books', async (request, response) => {
  try {
    let documents = await BookModel.find ({});
    response.json(documents);
  } catch (e) {
    console.log('Books not loading', e);
    response.status(500).send(e);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));