const { User } = require('../models');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  res.redirect('/login');
});

module.exports = router;