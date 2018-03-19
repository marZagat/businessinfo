require('dotenv').config();

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
const pgp = require('pg-promise')({});

const makeFakeData = require('./generateDataPSDB');

const cn = `postgres://${username}:${password}@${host}:${port}/businessinfo`;

const db = pgp(cn);

const connectDB = async () => {
  await db.connect();
  console.log('dbConnected');
};

const insertRestaurantBatch = async (fakeRestaurants) => {
  const restaurantColumns = ['place_id', 'formatted_address', 'international_phone_number', 'url', 'lat', 'lng', 'weekday_text'];
  const csRestaurants = new pgp.helpers.ColumnSet(restaurantColumns, { table: 'restaurants' });

  const insertionQueryRestaurants = pgp.helpers.insert(fakeRestaurants, csRestaurants);

  await db.none(insertionQueryRestaurants);
  console.log('inserted restaurants');
};

const insertHoursBatch = async (fakeHours) => {
  const hoursColumns = ['restaurant_id', 'weekday', 'open_time', 'close_time'];
  const csHours = new pgp.helpers.ColumnSet(hoursColumns, { table: 'hours' });
  const insertionQueryHours = pgp.helpers.insert(fakeHours, csHours);

  await db.none(insertionQueryHours);
  console.log('inserted hours');
};

const insertBatch = async (batchSize) => {
  const restaurantsBatch = [];
  const hoursBatch = [];
  for (let i = 0; i < batchSize; i += 1) {
    const { fakeRestaurantRow, fakeHoursRows } = makeFakeData(i);
    restaurantsBatch.push(fakeRestaurantRow);
    
    for (let j = 0; j < fakeHoursRows.length; j += 1) {
      hoursBatch.push(fakeHoursRows[j]);
    }
  }

  insertRestaurantBatch(restaurantsBatch);
  insertHoursBatch(hoursBatch);
};

const seedBatch = async (batchSize) => {
  await connectDB();
  await insertBatch(batchSize);
  console.log('postgres database seeded');
};

seedBatch(1000);

module.exports = db;
