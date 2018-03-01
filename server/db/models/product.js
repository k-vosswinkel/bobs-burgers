const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT, // it means generally that you won't be searching on this field -- KHLS
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.TEXT, // string? -- KHLS
    defaultValue: 'https://vignette.wikia.nocookie.net/ronaldmcdonald/images/0/0f/Imgres.jpeg/revision/latest?cb=20150625050506',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.FLOAT, // DECIMAL. Price -- DECIMAL(10,2)? -- KHLS
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0 // min? -- KHLS
  }
}, {
  getterMethods: {
    available() {
      return this.inventory > 0;
    }
  }
})

module.exports = Product
