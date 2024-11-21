const router= require('express').Router();
const {Movie, User, Comment}= require('../../models'); 

//http://localhost:3001/api/comments/
router.get('/', async(req, res) => {
    try{
        const commentData= await Comment.findAll({
          include:[{model: Movie}, {model: User}]
        });
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }
});

//http://localhost:3001/api/comments/1
router.get('/:id', async(req, res) => {
    try{
      const commentData= await Comment.findByPk(
        req.params.id,
        {
         include:[{model: Movie}, {model: User}]
        });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/comments/
router.post('/', async(req, res) => {
    try{
      const commentData= await Comment.create({...req.body, user_id:req.session.user_id});
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/comments/1
  router.put('/:id', async(req, res) => {
    try{
      const commentData= await Comment.update(req.body,
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/comments/1
router.delete('/:id', async(req, res) => {
    try{
      const commentData= await Comment.destroy(
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;