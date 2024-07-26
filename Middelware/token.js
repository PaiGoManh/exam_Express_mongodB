const jwt = require('jsonwebtoken');

const verifyToken = (role) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer TOKEN"
    if (!token) return res.status(403).send('Token required');
    jwt.verify(token, 'AuthToken', (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      if (role && decoded.role !== role) return res.status(403).send('Access denied');
      req.user = decoded;
      next();
    });
  };
};

module.exports = verifyToken;
