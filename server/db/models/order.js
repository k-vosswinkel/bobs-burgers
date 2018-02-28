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
    this.getLineItem()
      .then(lineItems => {
        lineItems.forEach(lineItem => {total += lineItem.price})
      })
    return total;
  },
  quantityTotal: function() {
    return this.getlineItem()
      .then(lineItems => {
        return lineItems.length;
      })
  }
}

})

module.exports = Order

