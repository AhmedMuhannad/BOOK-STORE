const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  photo: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;