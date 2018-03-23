require('dotenv').config();

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
const batchSize = process.env.BATCH_SIZE || 10000;
const numRecords = process.env.NUM_RECORDS || 10000000;
const database = process.env.DATABASE || 'business_info_postgres_relational';

const pgp = require('pg-promise')({});

const generateData = require('./generateRelationalData');

const cn = `postgres://${username}:${password}@${host}:${port}/${database}`;

const db = pgp(cn);

const connectDB = async () => {
  await db.connect()
    .then(() => console.log('dbConnected'))
    .catch((err) => {
      console.error(err);
    });
};

const insertRestaurantBatch = async (restaurants) => {
  const restaurantColumns = ['place_id', 'formatted_address', 'international_phone_number', 'url', 'lat', 'lng', 'weekday_text'];
  const csRestaurants = new pgp.helpers.ColumnSet(restaurantColumns, { table: 'restaurants' });

  const insertionQueryRestaurants = pgp.helpers.insert(restaurants, csRestaurants);

  await db.none(insertionQueryRestaurants)
    .catch((err) => {
      console.error(err);
    });
};

const insertHoursBatch = async (fakeHours) => {
  const hoursColumns = ['restaurant_id', 'weekday', 'open_time', 'close_time'];
  const csHours = new pgp.helpers.ColumnSet(hoursColumns, { table: 'hours' });
  const insertionQueryHours = pgp.helpers.insert(fakeHours, csHours);

  await db.none(insertionQueryHours)
    .catch((err) => {
      console.error(err);
    });
};

const insertBatch = async (startId) => {
  const restaurantsBatch = [];
  const hoursBatch = [];
  for (let i = 0; i < batchSize; i += 1) {
    const { restaurantRow, hoursRows } = generateData(startId + i);
    restaurantsBatch.push(restaurantRow);
    
    for (let j = 0; j < hoursRows.length; j += 1) {
      hoursBatch.push(hoursRows[j]);
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

const indexRestaurants = async () => {
  const indexRestaurantsQuery = 'ALTER TABLE restaurants ADD UNIQUE (place_id)';
  await db.none(indexRestaurantsQuery)
    .then(() => console.log('indexed restaurants'))
    .catch(error => console.error(error));
};

const addForeignKeys = async () => {
  const foreignKeyQuery = 'ALTER TABLE hours ADD CONSTRAINT fk FOREIGN KEY (restaurant_id) REFERENCES restaurants(place_id)';
  await db.none(foreignKeyQuery)
    .then(() => console.log('added foreign keys'))
    .catch(error => console.error(error));
};

const startSeed = Date.now();

seedDb(numRecords)
  .then(() => console.log('seeded!!'))
  .then(() => indexRestaurants())
  .then(() => addForeignKeys())
  .then(() => {
    const endSeed = Date.now();
    console.log('Seed time: ', endSeed - startSeed, 'ms');
  })
  .catch(err => console.error(err));

module.exports = db;
