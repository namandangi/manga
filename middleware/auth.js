const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { jwtSecret } = process.env;

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).json({
      msg: 'Please Provide JWT',
    });
  }
  const token = header.replace('Bearer', '').trim();
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    if (!decoded) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }
    const user = await User.findOne({ username: decoded.username });
    req.token = token;
    req.user = user;
    res.locals.user = user;
    next();
  } catch (e) {
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = { authRequired };
