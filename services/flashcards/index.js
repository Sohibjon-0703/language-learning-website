const Flashcard = require('../../models/flashcard');

exports.getAllFlashcards = async () => {
    return await Flashcard.find({});
};
