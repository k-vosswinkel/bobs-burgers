
/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const LineItem = db.model('lineItem')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model options: ', () => {
      let testOrder

      beforeEach(() => {
        return Order.create({
          status: 'Pending',
          email: 'ginny@hogwarts.edu',
          shippingAddress: 'Hogwarts Castle, Cardiff, Wales 02139'
        })
        .then(order => {
          testOrder = order;
          return LineItem.bulkCreate([
            {quantity: 2, currentPrice: 3.00, totalPrice: 6.00, orderId: order.id},
            {quantity: 1, currentPrice: 5.00, totalPrice: 5.00, orderId: order.id}
          ])
        })

      })

      describe('priceTotal', () => {
        it('correctly sums the prices across child line items', () => {
          console.log('testOrder before update', testOrder)
          return testOrder.update({status: 'Created'})
          .then(() => {
            console.log('testOrder after update', testOrder)
            expect(testOrder.totalPrice).to.equal(11.00)
          })
        })
      })

      describe('quantityTotal', () => {
        it('correctly sums the quantities across child line items', () => {
          expect(testOrder.quantityTotal).to.equal(3)
        })
      })
    })
  })

