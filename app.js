require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());







// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const userRoutes = require('./routes/users');  // Make sure the path is correct
app.use('/users', userRoutes);

// MongoDB connection
const mongoDB = process.env.MONGO_URI || 'mongodb+srv://hayitboyev2007:hltd2SD0AQcjQ5Xj@cluster0.j7a6dxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;         
      res.locals.user = decoded;    // Also available in Pug templates
    } catch (err) {
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users/index'));  // Auth routes
app.use('/flashcards', require('./routes/flashcards'));


app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
