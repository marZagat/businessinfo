const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;

const pgp = require('pg-promise')({

});

const cn = `postgres://${username}:${password}@${host}:${port}/businessinfo`;

const db = pgp(cn);

const connectDB = async () => {
  await db.connect();
  console.log('dbConnected');
}

connectDB();

module.exports = db;