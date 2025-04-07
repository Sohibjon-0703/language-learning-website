const Flashcard = require('../services/flashcards');

exports.index = async (req, res) => {
    const flashcards = await Flashcard.getAllFlashcards();
    res.render('index', { flashcards });
};
