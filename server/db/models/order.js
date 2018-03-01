const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Created', 'Processing', 'Cancelled', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
},
{ getterMethods: {
  priceTotal: function() {
    let total = 0
    this.getLineItems()
      .then(lineItems => {
        lineItems.forEach(lineItem => {
          total += lineItem.totalPrice
        })
        console.log('test price total', total)
        return total;
      })
  },
  quantityTotal: function() {
    let total = 0;
    this.getLineItems()
      .then(lineItems => {
        lineItems.forEach(lineItem => {
          total += lineItem.quantity
        })
        console.log('test quantity total', total)
        return total;
      })
    }
  }

})

module.exports = Order

