const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  // try {
  //   const { username, email, password } = req.body;
  //   const user = await User.create({
  //     username,
  //     email,
  //     password
  //   });
  //   req.session.user_id = user.id;
  //   req.session.save(err => {
  //     if (err) {
  //       console.error('Session save error:', err);
  //       return res.status(500).send('Failed to save session.');
  //     }
  //     res.redirect('/dashboard');
  //   });
  // } catch (error) {
  //   console.error('Signup error:', error);
  //   res
  //     .status(400)
  //     .render('signup', { error: 'Signup failed. Please try again.' });
  // }
  try {
    const userData = await User.create(req.body);

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
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await user.checkPassword(password)) {
      
      req.session.save(() => {
        req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({message: 'You are now logged in!'})
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
    res.status(200).json({message: "You are logged out"})
  });
});

module.exports = router;