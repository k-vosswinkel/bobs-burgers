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
  },
//   priceTotal: Sequelize.DECIMAL, -- KHLS
//   quantityTotal: Sequelize.INTEGER
// }

// { getterMethods: {
//   priceTotal: function() {
//     let total = 0
//     this.getLineItems()
//       .then(lineItems => {
//         lineItems.forEach(lineItem => {
//           total += lineItem.totalPrice
//         })
//         return total;
//       }).then(() => {
//         this.setDataValue('priceTotal', total)
//       })
//   },
//   quantityTotal: function() {
//     let total = 0;
//     this.getLineItems()
//       .then(lineItems => {
//         lineItems.forEach(lineItem => {
//           total += lineItem.quantity
//         })
//         console.log('test quantity total', total)
//         return total;
//       })
//     }
  // }
// }
)

// order hook to decrement product inventory -- KHLS

module.exports = Order
