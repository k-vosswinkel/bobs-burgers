/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.build({email: 'cody@email.com', password: '123'}),
//     User.build({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...')


//--------------------
//OUR SEED FILE
const Chance = require('chance');
const Promise = require('bluebird'); //Promise.map is not available in default promises
const chance = new Chance();
const { User, Category, LineItem, Product, Review, Order } = require('../server/db/models')
const db = require('../server/db')

let numOrders = 25;
let numUsers = 50;
let numReviews = 100;
let numCats = 5;
let numLineItems = 200;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

const randUser = () => {
  return User.build({
    email: chance.email(),
    password: chance.string({ length: 6 }),
    admin: chance.bool({ likelihood: 10 })
  })
}

const randReview = () => {
  return Review.build({
    text: chance.string({ length: 25 }),
    rating: chance.integer({ min: 1, max: 5 }),
    productId: chance.integer({ min: 1, max: 10 }),
    userId: chance.integer({ min: 1, max: 50 })
  })
}

const randCat = () => {
  return Category.build({
    name: chance.word()
  })
}

const randOrderUser = () => {
  return Order.build({
    userId: chance.integer({ min: 1, max: 50 }),
    productId: chance.integer({ min: 1, max: 5 })
  })
}

const randOrderGuest = () => {
  return Order.build({
    productId: chance.integer({ min: 6, max: 10 }),
    status: 'buildd'
  })
}

const randLineItem = () => {
  return LineItem.build({
    quantity: chance.integer({ min: 1, max: 10 }),
    productId: chance.integer({ min: 1, max: 10 }),
    orderId: chance.integer({ min: 1, max: 50 })
  })
}

//Hard coded products will go here
const generateProducts = () => {
  let products = [];
  products.push(Product.build({
    name: 'Sit and Spinach Burger',
    description: 'This spinach stuffed patty is the best way to eat your greens',
    price: 6.99,
    inventory: 5
  }));
  products.push(Product.build({
    name: 'Baby You Can Drive My Car! Burger',
    description: 'A feta stuffed burger on a chive-tastic bun. Topped with a million diced chives and a creamy sour cream & mustard spread',
    price: 7.99,
    inventory: 6
  }));
  products.push(Product.build({
    name: 'Pickle My Funny Bone Burger',
    description: 'Fried pickles take this burger to another level',
    price: 6.75,
    inventory: 10
  }));
  products.push(Product.build({
    name: 'Do the Brussel Burger',
    description: 'This is the only way you\'ll want to eat Brussel sprouts.',
    price: 8.49,
    inventory: 8
  }));
  products.push(Product.build({
    name: 'Cheeses is Born Burger',
    description: 'Swiss and Jarlsberg make this cheeseburger extra melty.',
    price: 6.99,
    inventory: 1
  }));
  products.push(Product.build({
    name: 'I\'ve buildd A Muenster Burger',
    description: 'Who can say no to melty cheese and mushrooms?',
    price: 9.99,
    inventory: 20
  }));
  products.push(Product.build({
    name: 'It\'s Fun to Eat At The Rye-MCA Burger',
    description: 'All-beef patties on rye bread topped with cheddar cheese, brown mustard, caramelized onions, and horseradish.',
    price: 1.99,
    inventory: 2
  }));
  products.push(Product.build({
    name: 'The Hard to Find Burger',
    description: 'One of a kind for a reason.',
    price: 8.99,
    inventory: 0
  }));
  products.push(Product.build({
    name: 'Bet It All On Black Garlic Burger',
    description: 'Winner winnder burger dinner! This all-beef patty is topped with fresh mozarella, spinach, homemade black garlic mayo and a dash of Sriracha hot sauce.',
    price: 12.99,
    inventory: 9
  }));
  products.push(Product.build({
    name: 'Don\'t You Four Cheddar \'Bout Me Burger',
    description: 'Lettuce, cheeseburger, bacon slices, onions. A gratuitous number of cheddars? No. Five would be crazy. But what are you going to do, three? No. Four\'s your number.',
    price: 4.00,
    inventory: 4
  }));
}

//remaining 'generate' functions go here
const generateUsers = () => {
  return doTimes(numUsers, () => randUser());
}

const generateReviews = () => {
  return doTimes(numReviews, () => randReview());
}

const generateCategories = () => {
  return doTimes(numCats, () => randCat());
}

const generateOrderUser = () => {
  return doTimes(numOrders, () => randOrderUser());
}

const generateOrderGuest = () => {
  return doTimes(numOrders, () => randOrderGuest());
}

const generateLineItem = () => {
  return doTimes(numLineItems, () => randLineItem());
}

function buildUsers() {
  return Promise.map(generateUsers(), user => user.save());
}

function buildReviews() {
  return Promise.map(generateReviews(), review => review.save());
}

function buildCategories() {
  return Promise.map(generateCategories(), category => category.save());
}

function buildOrdersUsers() {
  return Promise.map(generateOrderUser(), orderUser => orderUser.save());
}

function buildOrdersGuests() {
  return Promise.map(generateOrderGuest(), orderGuest => orderGuest.save());
}

function buildLineItems() {
  return Promise.map(generateLineItem(), lineItem => lineItem.save());
}

function buildProducts() {
  return Promise.map(generateProducts(), product => product.save());
}

// function seed() {
//   return buildCategories()
//     .then(buildUsers())
//     .then(buildProducts())
//     .then(buildOrdersUsers())
//     .then(buildOrdersGuests())
//     .then(buildReviews())
//     .then(buildLineItems());
// }

console.log('Syncing database');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database');
    return buildCategories()
      .then(buildUsers())
      .then(buildProducts())
      .then(buildOrdersUsers())
      .then(buildOrdersGuests())
      .then(buildReviews())
      .then(buildLineItems());
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
