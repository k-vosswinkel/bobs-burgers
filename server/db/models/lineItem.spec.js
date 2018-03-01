/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineItem')
const Product = db.model('product')

describe('Line Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('methods: ', () => {
      let testLineItem

      beforeEach(() => {
        return Product.create({
          name: 'beetBurger',
          description: 'a beet burger made by Bob',
          price: 4.00
        })
          .then(product => {
            return LineItem.create({
              quantity: 2,
              productId: product.id,
            })
            .then(createdLineItem => {
              testLineItem = createdLineItem;
            })
          })
      })

      // our afterCreate hook is not!
      describe('afterCreate hook', () => {
        it('correctly stamps the price of the related product', () => {
          console.log('testLineItem', testLineItem)
          expect(testLineItem.currentPrice).to.equal(4.00)
        })
      })

      // our getter method is working!
      describe('getterMethod', () => {
        it('correctly returns the total price, multiplying price times quantity', () => {
          expect(testLineItem.totalPrice).to.equal(8)
        })
      })

    })
  })

