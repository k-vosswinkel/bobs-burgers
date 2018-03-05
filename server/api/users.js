const router = require('express').Router()
const {User} = require('../db/models')
const {makeError, isLoggedIn, isAdmin} = require('../../utils')
module.exports = router

router.param('id', (req, res, next, id) => {
  User.findById(id)
  .then(user => {
    if (!user) {
      throw Error;
    } else {
      req.requestedUser = user;
    }
    next();
  })
  .catch(next)
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

router.get('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  req.requestedUser.reload({ include: [{ all: true }] })
  .then(user => {res.json(user)})
  .catch(next)
})

router.post('/', isLoggedIn, isAdmin, (req, res, next) => {
  User.create(req.body)
  .then(user => res.json(user))
  .catch(next);
})

router.put('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(() => req.user.reload({ include: [{ all: true }] }))
  .then(result => res.json(result))
  .catch(next);
})

router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  req.requestedUser.destroy()
  .then(() => res.json(req.user))
  .catch(next);
})
