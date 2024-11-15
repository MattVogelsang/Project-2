const axios = require('axios');
const { Movie } = require('../models');

router.get('/', async (req, res) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      s: movie.title,
      apikey: process.env.OMDB_API_KEY,
    },
  });
  res.render('index', { movies: response.data.Search });
});

router.get('/movie/:id', async (req, res) => {
  const movieResponse = await axios.get('http://www.omdbapi.com/', {
    params: {
      i: req.params.id,
      apikey: process.env.OMDB_API_KEY,
    },
  });
  const movie = movieResponse.data;
  res.render('movie', { movie });
});

module.exports = router;