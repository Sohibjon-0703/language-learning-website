const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,  // If word is required
  },
  translation: {
    type: String,
    required: true,  // If translation is required
  },
  example: {
    type: String,
    required: false,  // Example sentence is optional
  },
  topic: {
    type: String,
    required: false,  // Topic is optional
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;
