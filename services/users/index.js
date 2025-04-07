const User = require('../../models/user');

exports.register = async (username, password) => {
    const newUser = new User({ username, password });
    await newUser.save();
};
