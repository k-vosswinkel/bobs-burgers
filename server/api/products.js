const router = require('express').Router()
const { Product } = require('../db/models')
const {isLoggedIn, isAdmin} = require('../../utils.js')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({ include: [{ all: true }] })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId, { include: [{ all: true }] })
  .then(product => res.json(product))
  .catch(next)
})

router.put('/:productId',
// isLoggedIn,
// isAdmin,
(req, res, next) => {
  Product.findById(req.params.productId)
  .then(product => product.update(req.body))
  .then(product => res.json(product))
  .catch(next)
})

router.post('/',
// isLoggedIn,
// isAdmin,
(req, res, next) => {
  const {name, url, description, price, inventory, categories} = req.body
  Product.create({name, url, description, price, inventory
  })
  // .then(draftProduct => {
  //   const mappedCategories = categories.map(categoryString => Number(categoryString))
  //   return draftProduct.setCategories(mappedCategories)
  // })
  .then(finishedProduct => res.json(finishedProduct))
  .catch(next)
})

router.delete('/:productId',
// isLoggedIn,
// isAdmin,
(req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
