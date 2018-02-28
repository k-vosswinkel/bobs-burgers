const router = require('express').Router()
const {LineItem, Order} = require('../db/models')
const {isLoggedIn, isAdmin, makeError} = require('../../utils.js')
module.exports = router

// get all orders & get, update, and post a single order
router.get('/', isLoggedIn, (req, res, next) => {
  let query = req.user.isAdmin ? {} : {where: {userId: req.user.id}}
  Order.findAll(query, {include: [{ all: true }]})
    .then(orders => res.json(orders))
    .catch(next)
});

router.get('/:orderId', isLoggedIn, (req, res, next) => {
  Order.findById(req.params.orderId, {include: [{ all: true }]})
      .then(order => {
        if (!order) {
          const err = {status: 404};
          next(err);
        } else {
          if (order.userId !== req.userId) return next(makeError('403', 'Forbidden'));
          res.json(order);
        }
      })
      .catch(next)
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
      .then(order => res.json(order))
      .catch(next)
})

router.put('/:orderId', isLoggedIn, isAdmin, (req, res, next) => {
  Order.update(req.body, {
    where: {id: req.params.orderId},
    returning: true
  })
  .spread((updatedRowCount, updatedRows) => {
    res.json(updatedRows[0])
  })
  .catch(next)
});

// post, update, and delete line items within an order
router.post('/:orderId', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.json(lineItem))
    .catch(next)
});

router.put('/:orderId/:lineItemId', (req, res, next) => {
  LineItem.update(req.body, {
    where: {id: req.params.lineItemId},
    returning: true
  })
  .spread((updatedRowCount, updatedRows) => {
    res.json(updatedRows[0])
  })
  .catch(next);
});

router.delete('/:orderId/:lineItemId', (req, res, next) => {
  LineItem.delete(req.params.lineItemId)
    .then(() => res.sendStatus(204))
    .catch(next);
})
