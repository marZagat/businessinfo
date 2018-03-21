require('dotenv').config();
const pg = require('pg');
const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'davidseid';
const password = process.env.POSTGRES_PW || 'marzagat';
const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
const numberQueries = process.env.NUM_QUERIES || 10000;


const client = new pg.Client(`postgres://${username}:${password}@${host}:${port}/businessinfoflat`);

const connectDb = async () => {
  client.connect();
};


const queryRandomId = async () => {
  const startTime = new Date();
  const randomId = Math.floor(Math.random() * 9999999).toString();

  const text = 'SELECT * FROM restaurants WHERE place_id = ($1)';
  const values = [randomId];
  // client.query("SELECT * FROM stooges WHERE name IN ($1, $2, $3)", ['larry', 'curly', 'moe'], ...);

  await client.query(text, values);
  const endTime = new Date();
  const queryTime = endTime.getTime() - startTime.getTime();
  console.log(`Query time for id ${randomId} is: ${queryTime} ms`);
  return queryTime;
};

const logQueryTimes = async (numberQueries) => {
  await connectDb();

  let cumulativeTime = 0;
  for (let i = 0; i < numberQueries; i++) {
    cumulativeTime += await queryRandomId();
  }
  console.log(`Cumulative time for ${numberQueries} individual random id queries is: ${cumulativeTime} ms`);
  console.log(`Average time per query is: ${cumulativeTime/numberQueries} ms`);
};

logQueryTimes(numberQueries);
