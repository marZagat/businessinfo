require('dotenv').config();

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
const batchSize = process.env.BATCH_SIZE || 10000;
const numRecords = process.env.NUM_RECORDS || 10000000;
const database = process.env.DATABASE || 'business_info_postgres_non_relational';

const pgp = require('pg-promise')({});

const makeFakeData = require('./generateFlatData');

const cn = `postgres://${username}:${password}@${host}:${port}/${database}`;

const db = pgp(cn);

const connectDB = async () => {
  await db.connect()
    .then(() => console.log('dbConnected'))
    .catch((err) => {
      console.error(err);
    });
};

const insertRestaurantBatch = async (fakeRestaurants) => {
  const restaurantColumns = ['place_id', 'formatted_address', 'international_phone_number', 'url', 'lat', 'lng', 'weekday_text', 'monday_open', 'monday_close', 'tuesday_open', 'tuesday_close', 'wednesday_open', 'wednesday_close', 'thursday_open', 'thursday_close', 'friday_open', 'friday_close', 'saturday_open', 'saturday_close', 'sunday_open', 'sunday_close'];
  const csRestaurants = new pgp.helpers.ColumnSet(restaurantColumns, { table: 'restaurants' });

  const insertionQueryRestaurants = pgp.helpers.insert(fakeRestaurants, csRestaurants);

  await db.none(insertionQueryRestaurants)
    .catch((err) => {
      console.error(err);
    });
};

const insertBatch = async (startId) => {
  const restaurantsBatch = [];
  for (let i = 0; i < batchSize; i += 1) {
    const { fakeRestaurantRow } = makeFakeData(startId + i);
    restaurantsBatch.push(fakeRestaurantRow);
  }

  await insertRestaurantBatch(restaurantsBatch);
};

const seedDb = async (numRecords) => {
  await connectDB();

  const numBatches = numRecords / batchSize;
  for (let i = 0; i < numBatches; i += 1) {
    await insertBatch(i * batchSize)
      .then(() => console.log('seeded batch', i))
      .catch((err) => {
        console.error(err);
      });
  }
};

const indexRestaurants = async () => {
  const indexRestaurantsQuery = 'ALTER TABLE restaurants ADD UNIQUE (place_id)';
  await db.none(indexRestaurantsQuery)
    .then(() => console.log('indexed restaurants'))
    .catch(error => console.error(error));
};

const startSeed = Date.now();

seedDb(numRecords)
  .then(() => console.log('seeded!!'))
  .then(() => indexRestaurants())
  .then(() => {
    const endSeed = Date.now();
    console.log('Seed time: ', endSeed - startSeed, 'ms');
  })
  .catch(err => console.error(err));
  
module.exports = db;
