/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instance methods: ', () => {
      let testProduct

      beforeEach(() => {
        return Product.create({
          name: 'Beet Burger',
          description: 'beets, brown rice, black beans',
          price: 5.00,
          inventory: 5
        })
        .then(product => {
          testProduct = product;
          testProduct.decrement(3);
        })
      })

      describe('decrement method', () => {
        it('correctly decrements and saves the updated instance to the database', () => {
          Product.findById(1)
            .then(product => {
              expect(product.inventory).to.equal(2)
            })
        })
      })
    })
  })

