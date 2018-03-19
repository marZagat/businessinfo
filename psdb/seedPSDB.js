require('dotenv').config();

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
const batchSize = process.env.BATCH_SIZE || 10000;
const numRecords = process.env.NUM_RECORDS || 1000000;
const pgp = require('pg-promise')({});

const makeFakeData = require('./generateDataPSDB');

const cn = `postgres://${username}:${password}@${host}:${port}/businessinfo`;

const db = pgp(cn);

const connectDB = async () => {
  await db.connect()
    .then(() => console.log('dbConnected'))
    .catch((err) => {
      console.error(err);
    });
};

const insertRestaurantBatch = async (fakeRestaurants) => {
  const restaurantColumns = ['place_id', 'formatted_address', 'international_phone_number', 'url', 'lat', 'lng', 'weekday_text'];
  const csRestaurants = new pgp.helpers.ColumnSet(restaurantColumns, { table: 'restaurants' });

  const insertionQueryRestaurants = pgp.helpers.insert(fakeRestaurants, csRestaurants);

  await db.none(insertionQueryRestaurants)
    .then(() => console.log('inserted restaurants'))
    .catch((err) => {
      console.error(err);
    });
};

const insertHoursBatch = async (fakeHours) => {
  const hoursColumns = ['restaurant_id', 'weekday', 'open_time', 'close_time'];
  const csHours = new pgp.helpers.ColumnSet(hoursColumns, { table: 'hours' });
  const insertionQueryHours = pgp.helpers.insert(fakeHours, csHours);

  await db.none(insertionQueryHours)
    .then(() => console.log('inserted hours'))
    .catch((err) => {
      console.error(err);
    });
};

const insertBatch = async (startId) => {
  const restaurantsBatch = [];
  const hoursBatch = [];
  for (let i = 0; i < batchSize; i += 1) {
    const { fakeRestaurantRow, fakeHoursRows } = makeFakeData(startId + i);
    restaurantsBatch.push(fakeRestaurantRow);
    
    for (let j = 0; j < fakeHoursRows.length; j += 1) {
      hoursBatch.push(fakeHoursRows[j]);
    }
  }

  await insertRestaurantBatch(restaurantsBatch);
  await insertHoursBatch(hoursBatch);
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

seedDb(numRecords)
  .then(() => console.log('seeded!!'))
  .catch(err => console.error(err));

module.exports = db;
