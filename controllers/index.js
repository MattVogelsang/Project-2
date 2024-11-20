const router= require('express').Router();
const apiRoutes= require('./api');
const homeRoutes= require('./home-routes')
const movieRoutes= require('./movieRoutes')

router.use('/', homeRoutes);
router.use('/movies', movieRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

module.exports= router;