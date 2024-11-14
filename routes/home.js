// routes/home.js
router.get('/', async (req, res) => {
    try {
      const movies = await Movie.findAll(); // Replace with your actual query to fetch movies
      res.render('homepage', {
        movies,
        user: req.session.user, // Assuming you store user info in session
        currentYear: new Date().getFullYear()
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  