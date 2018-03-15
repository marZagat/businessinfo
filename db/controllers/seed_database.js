const makeFakeRestaurant = require('../../fakeDataGenerator.js');
const database = require('../models/restaurant.js');
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


// then try to use async await to build an array of 10000 records
// save them all
// wait until done
// batch another, and repeat

// open connection
// start at id 0
// for loop to 10000 to generate records in an array
// insert these records into database
// replace old records in memory with 10000 new records but keep incrementing the ids

async function seedDatabase() {
  await mongoose.connection.dropDatabase();
  console.log('database dropped');

  let id = 0;
  let fakeRestaurants;

  const generateFakeRestaurantData = (numRecords) => {
    for (let i = 0; i < numRecords; i++) {
      fakeRestaurants.push(makeFakeRestaurant(id));
      console.log('id of record put in', id);
      id++;
    }
  }

  for (var i = 0; i < 100; i++) {
    console.log('number of times batches made ', i+1);
    fakeRestaurants = [];
    generateFakeRestaurantData(10000);

    await insert(fakeRestaurants);
  }

  console.log('database seeded');
  mongoose.disconnect();
  console.log('database disconnected');
};

seedDatabase().catch(error => console.error(error.stack));