const makeFakeRestaurant = require('./fakeDataGenerator.js');
const { MongoClient } = require('mongodb');

const batchSize = parseInt(process.env.BATCH_SIZE, 10) || 10000;
const numBatches = parseInt(process.env.BATCH_SIZE, 10) || 1000;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {
  const restaurants = client.db('businessinfo').collection('restaurants');

  async function seedDatabase() {
    await client.db('businessinfo').dropDatabase();
    console.log('Dropped database');

    let id = 0;
    let fakeRestaurantsBatch;

    const generateFakeRestaurantsBatch = () => {
      for (let i = 0; i < batchSize; i += 1) {
        fakeRestaurantsBatch.push(makeFakeRestaurant(id));
        id += 1;
      }
    };

    for (let i = 0; i < numBatches; i += 1) {
      fakeRestaurantsBatch = [];
      generateFakeRestaurantsBatch(batchSize);

      await restaurants.insertMany(fakeRestaurantsBatch);
      console.log(`Inserted batch ending in id ${id - 1} `);
    }

    console.log('database seeded');
    client.close();
  }

  seedDatabase().catch(error => console.error(error.stack));
});

