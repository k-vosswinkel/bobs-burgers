const router = require('express').Router()
const {LineItem, Order} = require('../db/models')
const {isLoggedIn, isAdmin, makeError} = require('../../utils.js')
module.exports = router

// get all orders & get, update, and post a single order
router.get('/', isLoggedIn, (req, res, next) => {
  let query = req.user.isAdmin ? {} : {where: {userId: req.user.id}}
  Order.findAll(query, {include: [{ all: true }]}) // consider this in defaultScope if it makes sense -- KHLS
    .then(orders => res.json(orders))
    .catch(next)
});

router.get('/:orderId', isLoggedIn, (req, res, next) => {
  Order.findById(req.params.orderId, {include: [{ all: true }]}) // router.params? -- KHLS
      .then(order => {
        if (!order) {
          const err = {status: 404}; // use actual error object (look at your utils) -- KHLS
          next(err);
        } else {
          if (order.userId !== req.userId) return next(makeError('403', 'Forbidden')); // maybe we can use something like this in multiple places -- could we extrapolate a function in utils for that? -- KHLS
          res.json(order);
        }
      })
      .catch(next)
});

router.post('/', (req, res, next) => { // post should probably always be status of Pending (always making cart). There should only ever be 1 cart ('pending') at a time -- KHLS
  Order.create(req.body) // IF there is a user id then ensure who the order is created for is selfOrAdmin -- KHLS
      .then(order => res.json(order)) // 201 -- KHLS
      .catch(next)
})

router.put('/:orderId', isLoggedIn, isAdmin, (req, res, next) => { // adminOrSelf -- KHLS
  // only admin can change all statuses; user can only change from pending to completed
  // only statuses should be updated here -- KHLS
  const status = req.body.status
  // if (self && req.order.status === pending)
  Order.update({status}, {
    where: {id: req.params.orderId},
    returning: true
  })
  .spread((updatedRowCount, updatedRows) => {
    res.json(updatedRows[0])
  })
  .catch(next)
});

router.delete('/:orderId', (req, res, next) => { // only admins -- KHLS
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// post, update, and delete line items within an order
  // I would almost think cart router makes the most sense organizationally; however, having it in here isn't off the wall -- KHLS
router.post('/:orderId', (req, res, next) => { // only being posted to `pending` orders. selfOrAdminOrNonUserOrder -- KHLS
  LineItem.create(req.body)
    .then(lineItem => res.json(lineItem)) // 201 might make sense here but I wouldn't require it -- KHLS
    .catch(next)
});

router.put('/:orderId/:lineItemId', (req, res, next) => { // `api/orders/:orderId/lineItem/:lineItemId`. only being posted to `pending` orders. selfOrAdminOrNonUserOrder -- KHLS
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
  LineItem.delete(req.params.lineItemId) // destroy and where clause --> consider with all the deletes, do you even want this? (consider paranoid true vs this vs put that deactivates (with a defaultScope that doesn't include these)). If you just delete - who can do that? -- KHLS
    .then(() => res.sendStatus(204))
    .catch(next);
})
