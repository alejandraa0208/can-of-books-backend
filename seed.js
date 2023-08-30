'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const BookModel = require('./BookModel.js');
const MONGODB_URL = process.env.MONGODB_URL;

console.log(MONGODB_URL);
mongoose.connect(MONGODB_URL);

const book1 = new BookModel({
    title: 'I Am Memory',
    description: '"I Am Memory" is a captivating novel by Ann Brashares that explores the intertwining lives of characters through the lens of memory. The story delves into the impact of memories on relationships, personal growth, and the way individuals perceive their own lives.',
    status: 'unread'
});

const book2 = new BookModel({
    title: 'The Secrets of the Immortal Nicholas Flamel Series',
    description: '"The Secrets of the Immortal Nicholas Flamel" series by Michael Scott is an engaging fantasy series that follows the adventures of twins Sophie and Josh Newman as they become entwined in a world of magic, ancient secrets, and immortal beings. The series combines elements of mythology, history, and magic as the twins navigate a treacherous path to unlock their own potential.',
    status: 'unread'
});

const book3 = new BookModel({
    title: 'The Girl Who Fell Beneath the Sea',
    description: '"The Girl Who Fell Beneath the Sea" is an intriguing novel by Axie Oh that delves into a world of mythology and underwater mysteries. The story follows a young woman who discovers hidden powers and a connection to a submerged world as she unravels secrets that bridge the gap between the realms of the land and the sea.',
    status: 'unread'
});

Promise.all([
    book1.save(),
    book2.save(),
    book3.save()
]).then(documents => {
    console.log(documents);
});