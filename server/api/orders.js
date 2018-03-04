const router = require('express').Router()
const {LineItem, Order} = require('../db/models')
const {isLoggedIn, isAdmin, makeError} = require('../../utils.js')
module.exports = router

// get all orders & get, update, and post a single order
router.get('/', (req, res, next) => {
  // let query = req.user.isAdmin ? {} : {where: {userId: req.user.id}}
  Order.findAll({include: [{ all: true }]})
    .then(orders => res.json(orders))
    .catch(next)
});

//For Testing purposes due to logged in requirement - AS
// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.orderId, {include: [{ all: true }]})
//   .then(order => res.json(order))
//   .catch(next)
// });
//{include: [{ all: true }]}

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      if (!order) {
        return next(makeError('404', 'Not Found'))
      } else {
        // if (order.userId !== req.userId) return next(makeError('403', 'Forbidden'));
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

router.delete('/:orderId', (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// post, update, and delete line items within an order
router.post('/:orderId/lineItems', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.json(lineItem))
    .catch(next)
});

router.put('/:orderId/lineItems/:lineItemId', (req, res, next) => {
  LineItem.update(req.body, {
    where: {id: req.params.lineItemId},
    returning: true
  })
  .spread((updatedRowCount, updatedRows) => {
    res.json(updatedRows[0])
  })
  .catch(next);
});

router.delete('/:orderId/lineItems/:lineItemId', (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.params.lineItemId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
})
