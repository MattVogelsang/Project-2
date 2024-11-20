const axios = require('axios');
const { Movie } = require('../models');
const router= require('express').Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=Spider-man&api_key=${process.env.TMDB_API_KEY}`
  );
  console.log(response.data.results)
  res.render('index', { movies: response.data.results });
});

router.get('/movie/:id', async (req, res) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`
  );
  console.log(response)
  const movie = response.data;
  res.render('movie', { movie });
});

module.exports = router;