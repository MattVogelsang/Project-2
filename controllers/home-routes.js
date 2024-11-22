const router = require('express').Router();
const { User, Comment } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.render('login');
      return;
    }
  res.render("homepage", {logged_in: req.session.logged_in})
  });

  router.get('/index', withAuth, (req, res) => {
    res.render('index', { movies: req.session.results });
  });

// movies route
// router.get('/movies', (req, res) => {
//     // If the user is not logged in, redirect to login page
//     if (!req.session.logged_in) {
//         return res.redirect('/login');
//     }
//     const message = req.query.message;

//     // Render the dashboard with the success message if available
//     res.render('movies', {
//         loggedIn: req.session.logged_in,
//         message: message
//     });
// });



// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Profile route
router.get('/profile', withAuth, async (req, res) => {
    try{
        const userData= await User.findByPk(req.session.user_id, {
            include: Comment
        })
        let selectedUser= userData.get({plain:true})
        console.log(selectedUser) 
        res.render('profile', {...selectedUser, logged_in: req.session.logged_in})
    }
    catch(err){
        return res.status(500).json(err)
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, // Make sure to hash the password before saving
        });

        req.session.logged_in = true;
        req.session.user_id = newUser.id;

        res.redirect('/'); // Redirect to homepage after successful signup
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
