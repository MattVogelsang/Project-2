const router= require('express').Router();
const movieRoutes= require('../movieRoutes');
const userRoutes= require('./user-routes');
const commentRoutes= require('./comment-routes');

//http://localhost:3001/api/movies
router.use('/movies', movieRoutes);

//http://localhost:3001/api/users
router.use('/users', userRoutes);

//http://localhost:3001/api/comments
router.use('/comments', commentRoutes);

module.exports= router;