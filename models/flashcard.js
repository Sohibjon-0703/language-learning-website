const mongoose = require('mongoose');
// validationn is included
const flashcardSchema = new mongoose.Schema({
  word: { 
    type: String, 
    required: true,
    minlength: [3, 'Word must be at least 3 characters long'],
    maxlength: [20, 'Word must be at most 20 characters long']  
  },
  translation: { type: String, required: true,
    minlength: [3, 'Word must be at least 3 characters long'],
    maxlength: [20, 'Word must be at most 20 characters long']
   },
  example: { type: String },
  topic: { type: String,
    maxlength: [20, 'Word must be at most 20 characters long']
   },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;
