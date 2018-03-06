
/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const LineItem = db.model('lineItem')
const Product = db.model('product')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('hooks: ', () => {
      let testOrder
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
          return Order.create({
            status: 'Pending',
            email: 'ginny@hogwarts.edu',
            shippingAddress: 'Hogwarts Castle, Cardiff, Wales 02139'
          })
          .then(order => {
            testOrder = order;
            return LineItem.create({
              quantity: 2, currentPrice: 3.00, totalPrice: 6.00, orderId: order.id, productId: 1
          })
          .then(() => {
            testOrder.update({status: 'Created'})
            testOrder.save()
          })
        })
      })
    })

      // describe('priceTotal', () => {
      //   it('correctly sums the prices across child line items', () => {
      //     expect(testOrder.priceTotal).to.equal(11.00)
      //   })
      // })

      describe('the afterUpdate order hook', () => {
        it('correctly updates product', () => {
          expect(testProduct.inventory).to.equal(3)
        })
      })
    })
  })
