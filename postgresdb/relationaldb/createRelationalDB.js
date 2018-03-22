require('dotenv').config();
const pg = require('pg');
const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;

const client = new pg.Client(`postgres://${username}:${password}@${host}:${port}/businessinfo`);
client.connect();
const query = client.query(`CREATE TABLE restaurants(
                            place_id TEXT, 
                            formatted_address VARCHAR(120), 
                            international_phone_number VARCHAR(40), 
                            url VARCHAR(40), 
                            lat REAL, 
                            lng REAL, 
                            weekday_text VARCHAR(250))`)
  .then(() => client.query(`CREATE TABLE hours(
                            restaurant_id TEXT, 
                            weekday INTEGER, 
                            open_time TEXT, 
                            close_time TEXT)`))
  .then(() => client.query('CREATE INDEX restaurant_id ON hours (restaurant_id)'))
  .then(() => client.end());