const router = require('express').Router()
const {LineItem, Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {include: [{ all: true }]})
      .then(order => {
        if (!order) {
          const err = {status: 404};
          next(err);
        } else {
          res.json(order);
        }
      })
      .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
      .then(order => res.json(order))
      .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.update(req.body, {
    where: {id: req.params.orderId},
    returning: true
  })
  .spread((updatedRowCount, updatedRows) => {
    res.json(updatedRows[0])
  })
  .catch(next)
})

