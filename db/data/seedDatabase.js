const makeFakeRestaurant = require('./fakeDataGenerator.js');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {
  const restaurants = client.db('businessinfo').collection('restaurants');

  async function seedDatabase() {
    await client.db('businessinfo').dropDatabase();
    console.log('Dropped database');

    let id = 0;
    let fakeRestaurantsBatch;
    const batchSize = 10000;

    const generateFakeRestaurantsBatch = (batchSize) => {
      for (let i = 0; i < batchSize; i++) {
        fakeRestaurantsBatch.push(makeFakeRestaurant(id));
        id++;
      }
    };

    const numBatches = 3;
    for (let i = 0; i < numBatches; i++) {
      fakeRestaurantsBatch = [];
      generateFakeRestaurantsBatch(batchSize);

      await restaurants.insertMany(fakeRestaurantsBatch);
      console.log(`Inserted batch ending in id ${id-1} `);
    }

    console.log('database seeded');
    client.close();
  }

  seedDatabase().catch(error => console.error(error.stack));
});

