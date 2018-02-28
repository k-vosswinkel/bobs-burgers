const Sequelize = require('sequelize')
const db = require('../db')

const LineItem= db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  currentPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
},
{ getterMethods: {
  totalPrice: function() {
    return this.getDataValue('unitPrice') * this.getDataValue('quantity');
    }
},
  hooks: {
    afterCreate: function(lineItem) {
      lineItem.getProduct()
        .then(product => {
          lineItem.currentPrice = product.price
        })
    }
  }
})

module.exports = lineItem
