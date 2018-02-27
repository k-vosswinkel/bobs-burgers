const Sequelize = require('sequelize');
const db = require('../db');

export const Review = db.define('review', {
  text: {
    type: text,
    allowNull: false
  },
  rating: {
    allowNull: false,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  }
})
