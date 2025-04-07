const express = require('express');
const router = express.Router();

// Define routes for the main page
router.get('/', (req, res) => {
  res.render('index');  // Render the 'index.pug' template
});

module.exports = router;
