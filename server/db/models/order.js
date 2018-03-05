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
  totalPrice: Sequelize.FLOAT,
  // totalQuantity: Sequelize.INTEGER
},
// {
// getterMethods: {
//   priceTotal: function() {
//     let total = 0
//     return this.getLineItems()
//       .then(lineItems => {
//         lineItems.forEach(lineItem => {
//           total += lineItem.totalPrice
//         })
//         console.log('gettertotal', total)
//         return total;
//         // this.setDataValue('totalPrice', total);
//       })
//   }
// }
// }
//   quantityTotal: function() {
//     let total = 0;
//     this.getLineItems()
//       .then(lineItems => {
//         lineItems.forEach(lineItem => {
//           total += lineItem.quantity
//         })
//         console.log('test quantity total', total)
//         this.setDataValue('totalQuantity', total)
//       })
//     }
{hooks: {
  afterUpdate: function(order) {
    if (order.status === 'Created') {
      return order.getLineItems()
        .then(lineItems => {
          return lineItems.map(lineItem => lineItem.totalPrice
          )
        })
        .then(lineItemTotals => {
          return lineItemTotals.reduce((total, value) => total + value, 0)
        })
        .then(total => {
          order.setDataValue('totalPrice', total);
          order.save()
        })
    }
  }
}
  }
)

module.exports = Order

// Order.prototype.totalPrice = function() {
//   let instance = this;
//   return this.getLineItems()
//     .then(lineItems => lineItems.map(lineItem => lineItem.totalPrice))
//     .then(lineItemTotals => {
//       return lineItemTotals.reduce((total, value) => total + value, 0)
//     })
//     .then(total => {
//       instance.dataValues.total = total
//       return instance
//     })
// }


