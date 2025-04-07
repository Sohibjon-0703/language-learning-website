const User = require('../../services/users');

exports.registerForm = (req, res) => {
    res.render('register');
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    await User.register(username, password);
    res.redirect('/');
};