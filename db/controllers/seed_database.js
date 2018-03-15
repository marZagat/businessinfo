const makeFakeRestaurant = require('../../fakeDataGenerator.js');
// const database = require('../models/restaurant.js');
// const insert = database.insert;
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {
    const restaurants = client.db('businessinfo').collection('restaurants');

    async function seedDatabase() {
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
    
      for (var i = 0; i < 5; i++) {
        fakeRestaurants = [];
        generateFakeRestaurantData(10000);
    
        await restaurants.insertMany(fakeRestaurants);
      }
    
      console.log('database seeded');
      // client.close();
    };

  seedDatabase().then(async () => {await client.close()}).catch(error => console.error(error.stack));
});



