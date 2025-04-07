const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/languageLearning', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
};

module.exports = { connectDb };
