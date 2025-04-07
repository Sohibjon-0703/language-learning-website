const express = require('express');
const router = express.Router();
const User = require('../../models/user');  // Import the User model

// Route to create a new user
router.post('/create', (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });

  newUser.save()
    .then((user) => {
      res.send(`User created: ${user.username}`);
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});

module.exports = router;
