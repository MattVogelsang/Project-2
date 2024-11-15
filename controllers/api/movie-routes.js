const router= require('express').Router();
const {Movie, Comment, Rating}= require('../../models'); 

//http://localhost:3001/api/movies
router.get('/', async(req, res) => {
    try{
        const movieData= await Movie.findAll({
            include:[{model: Comment}, {model: Rating}]
        });
        res.status(200).json(movieData);
    } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/movies/1
router.get('/:id', async(req, res) => {
    try{
      const movieData= await Movie.findByPk(req.params.id,
        {
            include:[{model: Comment}, {model: Rating}]
      }
    );
      res.status(200).json(movieData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/movies/
router.post('/', async(req, res) => {
    try {const movieData= await Movie.create(req.body);
        res.status(200).json(movieData);
    } catch (err){
        res.status(500).json(err)
    }
  });

//http://localhost:3001/api/movies/1
router.put('/:id', async(req, res) => {
    try{
      const movieData= await Movie.update(req.body,
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(movieData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//http://localhost:3001/api/movies/1
router.delete('/:id', async(req, res) => {
    try{
      const movieData= await Movie.destroy(
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(movieData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports= router;