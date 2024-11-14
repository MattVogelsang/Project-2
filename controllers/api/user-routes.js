const router= require('express').Router();
const {User, Comment, Rating}= require('../../models'); 

//http://localhost:3001/api/users
router.get('/', async(req, res) => {
    try{
        const userData= await User.findAll({
            include:[{model: Comment}, {model: Rating}]
        });
        res.status(200).json(userData);
    } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/users/1
router.get('/:id', async(req, res) => {
    try{
      const userData= await User.findByPk(req.params.id,
        {
            include:[{model: Comment}, {model: Rating}]
      }
    );
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/users/
router.post('/', async(req, res) => {
    try {const userData= await User.create(req.body);
        res.status(200).json(userData);
    } catch (err){
        res.status(500).json(err)
    }
  });

//http://localhost:3001/api/users/1
router.put('/:id', async(req, res) => {
    try{
      const userData= await User.update(req.body,
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//http://localhost:3001/api/users/1
router.delete('/:id', async(req, res) => {
    try{
      const userData= await User.destroy(
      {
        where:{
          id:req.params.id
        }
      }
    );
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports= router;