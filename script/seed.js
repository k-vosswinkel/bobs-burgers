const db = require('../server/db')
const { Product, Category, User, Order, Review, LineItem } = require('../server/db/models')
const Chance = require('chance');
const Promise = require('bluebird'); //Promise.map is not available in default promises
const chance = new Chance();

//Set the amount of instances for each table
const numCategories = 10;
const numUsers = 50;
const numOrders = 50;
const numReviews = 100;
const numLineItems = 200;

//Helper function to generate an array of Create promises with random info
function doTimes(num, fn) {
  const results = [];
  while (num--) {
    results.push(fn());
  }
  return results;
}

//Random info for each table
const randCat = () => {
  return Category.create({
    name: chance.word()
  })
}

const randUser = () => {
  return User.create({
    email: chance.email(),
    password: chance.string({ length: 3 }),
    admin: chance.bool({ likelihood: 10 })
  })
}

const randOrder = () => {
  return Order.create({
    email: chance.email(),
    shippingAddress: chance.address(),
    userId: chance.integer({ min: 1, max: 50 }),
    productId: chance.integer({ min: 1, max: 10 })
  })
}

const randReview = () => {
  return Review.create({
    text: chance.string({ length: 25 }),
    rating: chance.integer({ min: 1, max: 5 }),
    productId: chance.integer({ min: 1, max: 10 }),
    userId: chance.integer({ min: 1, max: 50 })
  })
}

const randLineItem = () => {
  return LineItem.create({
    quantity: chance.integer({ min: 1, max: 10 }),
    productId: chance.integer({ min: 1, max: 10 }),
    orderId: chance.integer({ min: 1, max: 50 })
  })
}

//Promise generators return an array of Create promises for each table
const generateCategories = () => {
  return doTimes(numCategories, () => randCat());
}

const generateUsers = () => {
  return doTimes(numUsers, () => randUser());
}

const generateOrder = () => {
  return doTimes(numOrders, () => randOrder());
}

const generateReviews = () => {
  return doTimes(numReviews, () => randReview());
}

const generateLineItems = () => {
  return doTimes(numLineItems, () => randLineItem());
}

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const categories = await Promise.all(generateCategories())

  const users = await Promise.all(generateUsers())

  //one admin user for testing purposes
  await User.create({
    email: 'test@test.com',
    password: '1234',
    isAdmin: true
  })

  const products = await Promise.all([
    Product.create({
      name: 'Sit and Spinach Burger',
      description: 'This spinach stuffed patty is the best way to eat your greens',
      price: 6.99,
      inventory: 5
    })
    .then(product => product.setCategories([1, 2])),
    Product.create({
      name: 'Baby You Can Drive My Car! Burger',
      description: 'A feta stuffed burger on a chive-tastic bun. Topped with a million diced chives and a creamy sour cream & mustard spread',
      price: 7.99,
      inventory: 6
    }).then(product => product.setCategories([2, 3])),
    Product.create({
      name: 'Pickle My Funny Bone Burger',
      description: 'Fried pickles take this burger to another level',
      price: 6.75,
      inventory: 10
    }).then(product => product.setCategories([3, 4])),
    Product.create({
      name: 'Do the Brussel Burger',
      description: 'This is the only way you\'ll want to eat Brussel sprouts.',
      price: 8.49,
      inventory: 8
    }).then(product => product.setCategories([4, 5])),
    Product.create({
      name: 'Cheeses is Born Burger',
      description: 'Swiss and Jarlsberg make this cheeseburger extra melty.',
      price: 6.99,
      inventory: 1
    }).then(product => product.setCategories([5, 6])),
    Product.create({
      name: 'I\'ve Created A Muenster Burger',
      description: 'Who can say no to melty cheese and mushrooms?',
      price: 9.99,
      inventory: 20
    }).then(product => product.setCategories([6, 7])),
    Product.create({
      name: 'It\'s Fun to Eat At The Rye-MCA Burger',
      description: 'All-beef patties on rye bread topped with cheddar cheese, brown mustard, caramelized onions, and horseradish.',
      price: 1.99,
      inventory: 2
    }).then(product => product.setCategories([7, 8])),
    Product.create({
      name: 'The Hard to Find Burger',
      description: 'One of a kind for a reason.',
      price: 8.99,
      inventory: 0
    }).then(product => product.setCategories([8, 9])),
    Product.create({
      name: 'Bet It All On Black Garlic Burger',
      description: 'Winner winnder burger dinner! This all-beef patty is topped with fresh mozarella, spinach, homemade black garlic mayo and a dash of Sriracha hot sauce.',
      price: 12.99,
      inventory: 9
    }).then(product => product.setCategories([9, 10])),
    Product.create({
      name: 'Don\'t You Four Cheddar \'Bout Me Burger',
      description: 'Lettuce, cheeseburger, bacon slices, onions. A gratuitous number of cheddars? No. Five would be crazy. But what are you going to do, three? No. Four\'s your number.',
      price: 4.00,
      inventory: 4
    }).then(product => product.setCategories([10, 1]))
  ])

  const orders = await Promise.all(generateOrder())

  const reviews = await Promise.all(generateReviews())

  const lineItems = await Promise.all(generateLineItems())


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${products.length} users, ${categories.length} categories, ${users.length} users, ${orders.length} orders, ${reviews.length} reviews, and ${lineItems.length} line items`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
