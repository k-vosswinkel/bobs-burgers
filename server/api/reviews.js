const router = require('express').Router()
const { Review } = require('../db/models')
const { isLoggedIn, isAdmin } = require('../../utils.js')
module.exports = router

//no auth needed to display all reviews or review by ID
router.param('id', (req, res, next, id) => {
  Review.findById(id)
  .then(review => {
    if (!review) {
      throw Error // same as before -- KHLS
    }
    else {
      req.review = review;
    }
    next();
  })
  .catch(next);
})

router.get('/', (req, res, next) => {
  Review.findAll({ include: [{all: true}]})
  .then(reviews => res.json(reviews))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  req.review.reload({ include: [{ all: true }] })
  .then(result => res.json(result))
  .catch(next);
})

//only logged-in users can create a review
router.post('/', isLoggedIn, (req, res, next) => { // adminOrSelf (author is self) -- KHLS
  // is req.body.author_id = req.user (or check and throw error :D ) -- KHLS
  Review.create(req.body)
  .then(result => res.json(result))
  .catch(next);
})

//when you're logged in, can you see all of your reviews and update them?
//Just to keep it simple for now, I am only letting admins edit reviews.
router.put('/:id', isAdmin, (req, res, next) => {
  req.review.update(req.body)
    .then(() => req.review.reload({ include: [{ all: true }] })) // spacing? -- KHLS
  .then(review => res.json(review))
  .catch(next)
})

//when you're logged in, can you see all of your reviews and delete them?
//Just to keep it simple for now, I am only letting admins delete reviews.
router.delete('/:id', isAdmin, (req, res, next) => {
  req.review.destroy()
  .then(() => res.json(req.review)) // 204 -- KHLS
  .catch(next);
})
