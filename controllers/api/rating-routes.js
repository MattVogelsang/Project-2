const router= require('express').Router();
const {Movie, User, Comment, Rating}= require('../../models'); 

//http://localhost:3001/api/ratings/
router.get('/', async(req, res) => {
    try{
        const ratingData= await Rating.findAll({
          include:[{model: Movie}, {model: User}, {model: Comment}]
        });
        res.status(200).json(ratingData);
      } catch (err) {
        res.status(500).json(err);
      }
});

//http://localhost:3001/api/ratings/1
router.get('/:id', async(req, res) => {
    try{
      const ratingData= await Rating.findByPk(
        req.params.id,
        {
         include:[{model: Movie}, {model: User}, {model: Comment}]
        });
      res.status(200).json(ratingData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/ratings/
router.post('/', async(req, res) => {
    try{
      const ratingData= await Rating.create(req.body);
      res.status(200).json(ratingData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/ratings/1
  router.put('/:id', async(req, res) => {
    try{
      const ratingData= await Rating.update(req.body,
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(ratingData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/ratings/1
router.delete('/:id', async(req, res) => {
    try{
      const ratingData= await Rating.destroy(
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(ratingData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;