const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userData= await User.create({ username, email, password });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
      if (!user.checkPassword(password)){
        res.status(500).json({ error: 'Login failed. Please try again.' })
      }
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.status(200).json({ message: 'You are now logged in!' })
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
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "You are logged out" })
  });
});

module.exports = router;