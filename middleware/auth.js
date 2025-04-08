const jwt = require('jsonwebtoken');

module.exports = function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // makee sure req.user is set
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
