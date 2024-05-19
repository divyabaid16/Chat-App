const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already exist" })
      }

      const newUser = new User({ username, email, password });
      return newUser.save()
        .then(() => {
          res.status(201).json({ message: "User registered successfully" });
        });
    })
    .catch(() => {
      res.status(500).json({ message: 'Server error' });
    })
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
          const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

          res.status(200).json({ message: 'Login successful', token });
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' });
    });
});

module.exports = router;