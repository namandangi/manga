/* eslint-disable comma-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { jwtSecret } = process.env;

exports.userSignUp = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(400).json({ msg: 'User already exists!' });
  }
  const doc = new User({ username, password });
  await doc.save();
  const token = jwt.sign(
    { username, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6 },
    jwtSecret
  );
  res.status(201).send({ doc, token });
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ msg: 'User not found' });
  }
  const auth = bcrypt.compareSync(password, user.password);
  if (!auth) {
    res.status(401).json({ msg: 'Incorect Password' });
  }
  const token = jwt.sign(
    { username, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6 },
    jwtSecret
  );
  res.status(200).send({ user, token });
};

exports.userProfile = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json(user);
};

exports.userDelete = async (req, res) => {
  const { username } = req.params;
  const doc = await User.deleteOne({ username });
  if (!doc) {
    res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json({ msg: 'ok' });
};
