const router = require('express').Router()
const {Review} = require('../db/review')
module.exports = router

router.params('id', (req,res,next,id) => {
  Review.findById(id)
  .then(review => {
    if (!review) {
      throw Error
    }
    else {
      req.review = review;
    }
    next();
  })
  .catch(err);
})

router.get('/', (req,res,next) => {
  Review.findAll({ include: [{all: true}]})
  .then(reviews => res.json(reviews))
  .catch(next);
})

router.get('/:id', (req,res,next) => {
  req.review.reload()
  .then(result => res.json(result))
  .catch(next);
})

router.post('/', (req,res,next) => {
  Review.create(req.body)
  .then(result => res.json(result))
  .catch(next);
})

router.put('/:id', (req,res,next) => {
  req.review.update(req.body)
  .then(result => req.review.reload())
  .then(review => res.json(review))
})

router.delete('/:id', (req,res,next) => {
  req.review.destroy()
  .then(() => res.json(req.review))
  .catch(next);
})
