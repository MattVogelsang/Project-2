const router = require('express').Router();
const { User } = require('../models');
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

  router.get('/index', (req, res) => {
 
    if (!req.session.logged_in) {
        res.render('login');
      return;
    }
    res.render('index', { movies: req.session.results });
  });

// Post details route by ID
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        // Serialize the post data
        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
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
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;
