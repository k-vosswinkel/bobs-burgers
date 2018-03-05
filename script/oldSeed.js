const db = require('../server/db')
const {User, Category, LineItem, Product, Review, Order } = require('../server/db/models')
const Chance = require('chance');
const Promise = require('bluebird'); //Promise.map is not available in default promises
const chance = new Chance();

//Setting the amount of seed info we want per table
let numOrders = 25;
let numUsers = 50;
let numReviews = 100;
let numCats = 5;
let numLineItems = 200;

function doTimes(num, fn) {
  const results = [];
  while (num--) {
    results.push(fn());
  }
  return results;
}

const randUser = () => {
  return User.create({
    email: chance.email(),
    password: chance.string({ length: 3 }),
    admin: chance.bool({ likelihood: 10 })
  })
}

const randReview = () => {
  return Review.create({
    text: chance.string({ length: 25 }),
    rating: chance.integer({ min: 1, max: 5 })
    // productId: chance.integer({ min: 1, max: 10 }),
    // userId: chance.integer({ min: 1, max: 50 })
  })
}

const randCat = () => {
  return Category.create({
    name: chance.word()
  })
}

const randOrderUser = () => {
  return Order.create({
    email: chance.email(),
    shippingAddress: chance.address()
    // userId: chance.integer({ min: 1, max: 50 }),
    // productId: chance.integer({ min: 1, max: 10 })
  })
}

const randOrderGuest = () => {
  return Order.create({
    productId: chance.integer({ min: 1, max: 10 }),
    status: 'Created'
  })
}

const randLineItem = () => {
  return LineItem.create({
    quantity: chance.integer({ min: 1, max: 10 })
    // productId: chance.integer({ min: 1, max: 10 }),
    // orderId: chance.integer({ min: 1, max: 50 })
  })
}

//Hard coded products will go here
const generateProducts = () => {
  let products = [];
  products.push(Product.create({
    name: 'Sit and Spinach Burger',
    description: 'This spinach stuffed patty is the best way to eat your greens',
    price: 6.99,
    inventory: 5
  }));
  products.push(Product.create({
    name: 'Baby You Can Drive My Car! Burger',
    description: 'A feta stuffed burger on a chive-tastic bun. Topped with a million diced chives and a creamy sour cream & mustard spread',
    price: 7.99,
    inventory: 6
  }));
  products.push(Product.create({
    name: 'Pickle My Funny Bone Burger',
    description: 'Fried pickles take this burger to another level',
    price: 6.75,
    inventory: 10
  }));
  products.push(Product.create({
    name: 'Do the Brussel Burger',
    description: 'This is the only way you\'ll want to eat Brussel sprouts.',
    price: 8.49,
    inventory: 8
  }));
  products.push(Product.create({
    name: 'Cheeses is Born Burger',
    description: 'Swiss and Jarlsberg make this cheeseburger extra melty.',
    price: 6.99,
    inventory: 1
  }));
  products.push(Product.create({
    name: 'I\'ve Created A Muenster Burger',
    description: 'Who can say no to melty cheese and mushrooms?',
    price: 9.99,
    inventory: 20
  }));
  products.push(Product.create({
    name: 'It\'s Fun to Eat At The Rye-MCA Burger',
    description: 'All-beef patties on rye bread topped with cheddar cheese, brown mustard, caramelized onions, and horseradish.',
    price: 1.99,
    inventory: 2
  }));
  products.push(Product.create({
    name: 'The Hard to Find Burger',
    description: 'One of a kind for a reason.',
    price: 8.99,
    inventory: 0
  }));
  products.push(Product.create({
    name: 'Bet It All On Black Garlic Burger',
    description: 'Winner winnder burger dinner! This all-beef patty is topped with fresh mozarella, spinach, homemade black garlic mayo and a dash of Sriracha hot sauce.',
    price: 12.99,
    inventory: 9
  }));
  products.push(Product.create({
    name: 'Don\'t You Four Cheddar \'Bout Me Burger',
    description: 'Lettuce, cheeseburger, bacon slices, onions. A gratuitous number of cheddars? No. Five would be crazy. But what are you going to do, three? No. Four\'s your number.',
    price: 4.00,
    inventory: 4
  }));
}

//remaining 'generate' functions go here
const generateUsers = () => {
  User.create({
    email: 'notBob@bob.com',
    password: 'badtestpassword',
    admin: true
  })
  return doTimes(numUsers, () => randUser());
}

const generateReviews = () => {
  return doTimes(numReviews, () => randReview());
}

const generateCategories = () => {
  return doTimes(numCats, () => randCat());
}

const generateOrderUser = () => {
  Order.build({
    userId: 1,
    productId: chance.integer({ min: 1, max: 10 })
  })
  return doTimes(numOrders, () => randOrderUser());
}

const generateOrderGuest = () => {
  return doTimes(numOrders, () => randOrderGuest());
}

const generateLineItem = () => {
  return doTimes(numLineItems, () => randLineItem());
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  // await Promise.all([generateCategories(), generateUsers(), generateProducts(), generateOrderUser(), generateOrderGuest(), generateReviews(), generateLineItem()])

  //currently working:
  await queryInterface.removeConstraint('users', 'users_ibfk_1', {}).then(() => {
    Promise.all([generateCategories(), generateUsers(), generateProducts(), generateOrderUser(), generateOrderGuest()])
  }).then(Promise.all([generateOrderUser(), generateReviews(), generateLineItem()]))

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

//BEGIN OLD SEED FILE CODE...

// function createUsers() {
//   return Promise.map(generateUsers(), user => user.save());
// }

// function createReviews() {
//   return Promise.map(generateReviews(), review => review.save());
// }

// function createCategories() {
//   return Promise.map(generateCategories(), category => category.save());
// }

// function createOrdersUsers() {
//   return Promise.map(generateOrderUser(), orderUser => orderUser.save());
// }

// function createOrdersGuests() {
//   return Promise.map(generateOrderGuest(), orderGuest => orderGuest.save());
// }

// function createLineItems() {
//   return Promise.map(generateLineItem(), lineItem => lineItem.save());
// }

// function createProducts() {
//   return Promise.map(generateProducts(), product => product.save());
// }

// function seed() {
//   return createCategories()
//     .then(createUsers())
//     .then(createProducts())
//     .then(createOrdersUsers())
//     .then(createOrdersGuests())
//     .then(createReviews())
//     .then(createLineItems());
// }

// console.log('Syncing database');

// db.sync({ force: true })
//   .then(() => {
//     console.log('Seeding database');
//     return seed();
//   })
//   .then(() => console.log('Seeding successful'))
//   .catch(err => {
//     console.error('Error while seeding');
//     console.error(err.stack);
//   })
//   .finally(() => {
//     db.close();
//     return null;
//   });


//END OLD SEED FILE

// up: (queryInterface, Sequelize) => {

//   return queryInterface.removeConstraint('users', 'users_ibfk_1', {}).then(() => {
//     return queryInterface.bulkInsert('users',
//       [{}, {} .....INSERT YOUR BULK INSERT STUFF HERE]
//       , {}).then(() => {
//         return queryInterface.addConstraint('users', ['userId'], {
//           type: 'FOREIGN KEY',
//           name: 'users_ibfk_1',
//           references: { //Required field
//             table: 'users',
//             field: 'id'
//           },
//           onDelete: 'set NULL',
//           onUpdate: 'cascade'
//         });
//       });
//   });

// },

//SEED ORDER
  // + function seed() {
  //   +  return createCategories()
  //     +    .then(createUsers())
  //     +    .then(createProducts())
  //     +    .then(createOrdersUsers())
  //     +    .then(createOrdersGuests())
  //     +    .then(createReviews())
  //     +    .then(createLineItems());
  //   +}
