const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });
    req.session.userId = user.id;
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).send('Failed to save session.');
      }
      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Signup error:', error);
    res
      .status(400)
      .render('signup', { error: 'Signup failed. Please try again.' });
  }
});


router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await user.checkPassword(password)) {
      req.session.userId = user.id;
      req.session.logged_in = true;
      req.session.message = 'You are now logged in!';
      req.session.save(() => {
        res.redirect('/dashboard');
      });
    } else {
      res.status(400).json({ error: 'Invalid password or email.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;