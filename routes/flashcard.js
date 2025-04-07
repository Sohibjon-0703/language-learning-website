// const express = require('express');
// const router = express.Router();
// const Flashcard = require('../models/flashcard');
// const requireAuth = require('../middleware/authMiddleware');


// router.use(requireAuth);


// // Example route
// router.get('/', (req, res) => {
//   res.send(`Hello ${req.user.username}, here are your flashcards`);
// });


// // Create a new flashcard
// router.post('/create', async (req, res) => {
//   try {
//     const { question, answer, category } = req.body;
//     const flashcard = new Flashcard({ question, answer, category });
//     await flashcard.save();
//     res.status(201).send('Flashcard created successfully');
//   } catch (error) {
//     res.status(400).send('Error creating flashcard');
//   }
// });

// // Get all flashcards
// router.get('/', async (req, res) => {
//   try {
//     const flashcards = await Flashcard.find();
//     res.status(200).json(flashcards);
//   } catch (error) {
//     res.status(500).send('Error retrieving flashcards');
//   }
// });



// module.exports = router;
