// routes/profile.js
router.get('/profile', async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
  
    try {
      const user = await User.findByPk(req.session.user.id, {
        include: [
          { model: Rating, include: [Movie] }, // Assuming Rating has a relation to Movie
          { model: Comment, include: [Movie] }  // Assuming Comment has a relation to Movie
        ]
      });
  
      res.render('profile', {
        user,
        currentYear: new Date().getFullYear()
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  