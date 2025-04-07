const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoDB = 'mongodb+srv://hayitboyev2007:hltd2SD0AQcjQ5Xj@cluster0.j7a6dxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Set Pug as the template engine
app.set('view engine', 'pug');

// Serve static files from /public
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users/index'));  // Correctly route to users/index.js
app.use('/flashcards', require('./routes/flashcards'));


app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
