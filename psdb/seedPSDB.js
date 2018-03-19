require('dotenv').config();
const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
const pgp = require('pg-promise')({});

const makeFakeRestaurant = require('../db/data/fakeDataGenerator');

const cn = `postgres://${username}:${password}@${host}:${port}/businessinfo`;

const db = pgp(cn);

const connectDB = async () => {
  await db.connect();
  console.log('dbConnected');
}

connectDB();

const restaurantColumns = ['place_id', 'formatted_address', 'international_phone_number', 'url', 'lat', 'lng', 'weekday_text'];
const csRestaurants = new pgp.helpers.ColumnSet(restaurantColumns, {table: 'restaurants'});
const fakeRestaurants = [{place_id: '6', formatted_address: '765 Price Canyon Rd', international_phone_number: '805 345 9258', url: 'david.com', lat: 23.4, lng: 45.7, weekday_text: 'sample'}];
const insertionQueryRestaurants = pgp.helpers.insert(fakeRestaurants, csRestaurants);

db.none(insertionQueryRestaurants)
  .then(data => {
    console.log('success');
  })
  .catch(error => {
    console.error(error);
  });

const hoursColumns = ['restaurant_id', 'weekday', 'open_time', 'close_time'];
const csHours = new pgp.helpers.ColumnSet(hoursColumns, {table: 'hours'});
const fakeHours = [{restaurant_id: '6', weekday: 0, open_time: '800', close_time: '1900'}];
const insertionQueryHours = pgp.helpers.insert(fakeHours, csHours);

db.none(insertionQueryHours)
  .then(data => {
    console.log('success');
  })
  .catch(error => {
    console.error(error);
  })

module.exports = db;