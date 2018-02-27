const Sequelize = require('sequelize');
const db = require('../db');

export const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

