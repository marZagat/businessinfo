const makeFakeRestaurant = require('../../fakeDataGenerator.js');
const database = require('../models/restaurant.js');
// const mongoose = database.mongoose;
const insert = database.insert;
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';




//*old insert function* 
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



MongoClient.connect(url, (err, client) => {
  const restaurants = client.db('businessinfo').collection('restaurants');

  async function seedDatabase() {
    // await mongoose.connection.dropDatabase();
    await client.db('businessinfo').dropDatabase();
    console.log('database dropped');
  
  
    let id = 0;
    let fakeRestaurants;
  
    const generateFakeRestaurantData = (numRecords) => {
      for (let i = 0; i < numRecords; i++) {
        fakeRestaurants.push(makeFakeRestaurant(id));
        id++;
      }
      console.log('inserted id ', id);
    }
  
    for (var i = 0; i < 1000; i++) {
      fakeRestaurants = [];
      generateFakeRestaurantData(10000);
  
      await restaurants.insertMany(fakeRestaurants);
    }
  
    console.log('database seeded');
    // mongoose.disconnect();
    client.close();
    console.log('database disconnected');
  };


  seedDatabase().catch(error => console.error(error.stack));
});



