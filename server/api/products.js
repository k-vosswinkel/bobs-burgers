const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({ include: [{ all: true }] }) // maybe have this on defaultScope. But maybe all you actually need is reviews and categories
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:productId', (req, res, next) => { // I would expect router.params based on reviews and user -- KHLS
  Product.findById(req.params.productId, { include: [{ all: true }] })
    .then(product => res.json(product))
    .catch(next)
})

router.put('/:productId', (req, res, next) => { // who can update? -- KHLS
  Product.findById(req.params.productId)
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next)
})

router.post('/', (req, res, next) => { // who can? -- KHLS
  Product.create(req.body)
    .then(product => res.json(product)) // expect 201 -- KHLS
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  })
    .then(() => res.sendStatus(204)) // yeah do this in users and reviews! -- KHLS
    .catch(next)
})
