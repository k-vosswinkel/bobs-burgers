const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


router.param('id', (req,res,next,id) => {
  User.findById(id)
  .then(user => {
    if (!user) {
      throw Error;
    } else {
      req.user = user;
    }
    next();
  })
  .catch(err)
})
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req,res,next) => {
  req.user.reload()
  .then(user => {res.json(user)})
})

router.post('/:id', (req,res,next) => {
  User.create(req.body)
  .then(user => res.json(user))
  .catch(next);
})

router.put('/:id', (req,res,next) => {
  User.update(req.body)
  .then(result => req.user.reload())
  .then(result => res.json(result))
  .catch(next);
})

router.delete('/:id', (req,res,next) => {
  req.user.destroy()
  .then(result => res.json(req.user))
  .catch(next);
})
