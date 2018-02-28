const User = require('./user')
const Order = require('./order')
const LineItem = require('./lineItem')
const Review = require('./review')
const Product = require('./product')
const Category = require('./category')

User.hasMany(Order);
User.hasMany(Review);

Order.belongsTo(User);
Order.hasMany(LineItem);

Review.belongsTo(User);
Review.belongsTo(Product);

Product.hasMany(Review);
Product.hasMany(Category);
Product.hasMany(LineItem);

Category.hasMany(Product);

LineItem.belongsTo(Product);
LineItem.belongsTo(Order);

module.exports = {
  User,
  Order,
  LineItem,
  Review,
  Product,
  Category
}
