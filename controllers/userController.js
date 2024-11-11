// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.send('Invalid credentials');
    }
  });
  

  router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
  

module.exports = router;
