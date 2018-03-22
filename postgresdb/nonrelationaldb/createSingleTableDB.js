require('dotenv').config();
const pg = require('pg');

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;

const client = new pg.Client(`postgres://${username}:${password}@${host}:${port}/businessinfoflat`);
client.connect();
const query = client.query('CREATE TABLE restaurants(place_id TEXT, formatted_address VARCHAR(120), international_phone_number VARCHAR(40), url VARCHAR(40), lat REAL, lng REAL, weekday_text VARCHAR(250), monday_open TEXT, monday_close TEXT, tuesday_open TEXT, tuesday_close TEXT, wednesday_open TEXT, wednesday_close TEXT, thursday_open TEXT, thursday_close TEXT, friday_open TEXT, friday_close TEXT, saturday_open TEXT, saturday_close TEXT, sunday_open TEXT, sunday_close TEXT)')
  .then(() => client.end());
