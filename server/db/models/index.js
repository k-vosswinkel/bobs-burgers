const User = require('./user')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')
const Category = require('./category')
const LineItem = require('./lineItem')

User.hasMany(Order);
User.hasMany(Review);

Order.belongsTo(User);
Order.hasMany(LineItem);

Review.belongsTo(User);
Review.belongsTo(Product);

Product.hasMany(Review);
Product.belongsToMany(Category, {through: 'ProductCategory', foreignKey: 'productId'});
Product.hasMany(LineItem);

Category.belongsToMany(Product, { through: 'ProductCategory', foreignKey: 'categoryId' });

LineItem.belongsTo(Product);
LineItem.belongsTo(Order);

module.exports = {
  User,
  Order,
  Review,
  Product,
  Category,
  LineItem
}
