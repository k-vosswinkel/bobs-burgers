const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  currentPrice: {
    type: Sequelize.FLOAT, // DECIMAL -- KHLS
    allowNull: true
  }
},
{ getterMethods: { // spacing?! -- KHLS
  totalPrice: function() {
    return this.getDataValue('currentPrice') * this.getDataValue('quantity');
    }
},
  hooks: {
    afterCreate: function(lineItem) {
      return lineItem.getProduct() // I think we want to return so that things what to ensure this finished -- KHLS
        .then(product => {
          lineItem.currentPrice = product.price
          console.log('line item current price', lineItem.currentPrice)
          lineItem.save() // return -- KHLS
        })
    }
  }
})

//   hooks: { // in line Items -- KHLS
//     beforeUpdate: (instance) {
//   return db.models.order.findById(instance.orderId)
//     .then(order => {
            // return order.update({totalPrice: order.totalPrice + (instance.totalPrice)}) << check on if totalPrice is what we expect
//     })
// }

//   }

module.exports = LineItem
