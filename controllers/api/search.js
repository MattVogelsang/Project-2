const express = require('express');
const router = express.Router();
const { Movie } = require('../models'); // Adjust based on your model structure

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    // Find movies where the title or description contains the query (case insensitive)
    const movies = await Movie.findAll({
      where: {
        title: { [Op.iLike]: `%${query}%` },
      },
    });

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
