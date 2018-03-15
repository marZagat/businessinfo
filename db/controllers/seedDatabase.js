const makeFakeRestaurant = require('../../fakeDataGenerator.js');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {
    const restaurants = client.db('businessinfo').collection('restaurants');

    async function seedDatabase() {
      await client.db('businessinfo').dropDatabase();
      console.log('Dropped database');
    
      let id = 0;
      let fakeRestaurantsBatch;
      let batch;
    
      const generateFakeRestaurantsBatch = (batchSize) => {
        for (let i = 0; i < batchSize; i++) {
          fakeRestaurantsBatch.push(makeFakeRestaurant(id));
          id++;
        }
      }
    
      for (var i = 0; i < 5; i++) {
        fakeRestaurantsBatch = [];
        generateFakeRestaurantsBatch(10000);
    
        await restaurants.insertMany(fakeRestaurantsBatch);
        console.log(`Inserted batch ending in id ${id-1} `);
      }
    
      console.log('database seeded');
      client.close();
    };

  seedDatabase().catch(error => console.error(error.stack));
});



