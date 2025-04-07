const express = require('express');
const router = express.Router();
const Flashcard = require('../../models/flashcard');
const isAuthenticated = require('../../middleware/auth');  // Import the authentication middleware

// Apply the middleware to all flashcard routes to ensure the user is logged in
router.use(isAuthenticated);  // This will ensure all flashcard routes require authentication

// Route to display all flashcards
router.get('/', (req, res) => {
  Flashcard.find({ userId: req.user._id })  // Only fetch flashcards created by the logged-in user
    .then((flashcards) => {
      res.render('flashcards/index', { flashcards });  // Pass the flashcards to the pug template
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

// Route to create a new flashcard (GET form)
router.get('/create', (req, res) => {
  res.render('flashcards/create');  // Render the form to create a flashcard
});


router.post('/create', (req, res) => {
  const { word, translation, example, topic } = req.body;

  console.log('Creating flashcard for user:', req.user);  // Debugging line

  const newFlashcard = new Flashcard({
    word,
    translation,
    example,
    topic,
    userId: req.user._id,
  });

  newFlashcard.save()
    .then(() => {
      res.redirect('/flashcards');
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});


// Route to edit a flashcard (GET form)
router.get('/:id/edit', (req, res) => {
  const { id } = req.params;

  Flashcard.findOne({ _id: id, userId: req.user._id })  // Only fetch flashcard that belongs to the logged-in user
    .then((flashcard) => {
      if (!flashcard) {
        return res.status(404).send('Flashcard not found or not owned by user');
      }
      res.render('flashcards/edit', { flashcard });  // Render the form to edit the flashcard
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

// Route to update a flashcard (POST data)
router.post('/:id/update', (req, res) => {
  const { id } = req.params;
  const { word, translation, example, topic } = req.body;

  Flashcard.findOneAndUpdate(
    { _id: id, userId: req.user._id },  // Ensure only the flashcard owned by the user is updated
    { word, translation, example, topic }
  )
    .then(() => {
      res.redirect('/flashcards');  // Redirect to the list of flashcards
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

// Route to delete a flashcard
router.get('/:id/delete', (req, res) => {
  const { id } = req.params;

  Flashcard.findOneAndDelete({ _id: id, userId: req.user._id })  // Ensure only the flashcard owned by the user is deleted
    .then(() => {
      res.redirect('/flashcards');  // Redirect to the list of flashcards
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

module.exports = router;