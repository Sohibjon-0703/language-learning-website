const express = require('express');
const router = express.Router();
const User = require('../../models/user');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/create', (req, res) => {
  const { username } = req.body;  // Only take username for creation

  const newUser = new User({ username });

  newUser.save()
    .then((user) => {
      res.send(`User created: ${user.username}`);
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
});



// GET register
router.get('/register', (req, res) => {
  res.render('register'); // views/register.pug
});

// POST register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('User already exists. <a href="/users/register">Try again</a>');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// GET login
router.get('/login', (req, res) => {
  res.render('login'); // views/login.pug
});

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;  // This will work after adding express.urlencoded()

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send('Invalid credentials. <a href="/users/login">Try again</a>');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send('Invalid credentials. <a href="/users/login">Try again</a>');
    }

    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.cookie('token', token, { httpOnly: true });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});



// GET logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
