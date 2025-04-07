const express = require('express');
const router = express.Router();
const Flashcard = require('../../models/flashcard');

// Route to display all flashcards
router.get('/', (req, res) => {
  Flashcard.find()
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
    const { word, translation, example, topic } = req.body;  // Destructure fields from the form data
  
    // Create a new Flashcard with the data
    const newFlashcard = new Flashcard({ 
      word, 
      translation, 
      example, 
      topic 
    });
  
    newFlashcard.save()
      .then((flashcard) => {
        res.redirect('/flashcards');  // Redirect to the list of flashcards after saving
      })
      .catch((error) => {
        res.status(400).send(`Error: ${error.message}`);  // Handle any errors
      });
  });
  

// Route to edit a flashcard (GET form)
router.get('/:id/edit', (req, res) => {
  const { id } = req.params;

  Flashcard.findById(id)
    .then((flashcard) => {
      res.render('flashcards/edit', { flashcard });  // Render the form to edit the flashcard
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

// Route to update a flashcard (POST data)
router.post('/:id/update', (req, res) => {
  const { id } = req.params;
  const { word, translation, example, topic } = req.body; // Updated field names

  Flashcard.findByIdAndUpdate(id, { word, translation, example, topic })
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

  Flashcard.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/flashcards');  // Redirect to the list of flashcards
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

module.exports = router;
