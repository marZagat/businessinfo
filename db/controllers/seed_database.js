var data = require('../../fakeDataGenerator.js');
var database = require('../models/restaurant.js');
const mongoose = database.mongoose;
const insert = database.insert;

// database.insert(data)
//   .then((response) => {
//     database.mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Failed to seed database');
//     console.error('Error Name:', err.name);
//     console.error('Error Message:', err.message);
//     database.mongoose.disconnect();
//   });

// build insert function with async await
// try using async await to drop database and then insert data
// then try to use async await to build an array of 10000 records
// save them all
// wait until done
// batch another, and repeat

async function seedDatabase() {
  await mongoose.connection.dropDatabase();
  console.log('db dropped');
  await insert(data);
  mongoose.disconnect();
};

seedDatabase().catch(error => console.error(error.stack));