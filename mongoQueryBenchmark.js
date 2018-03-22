require('dotenv').config();
const { MongoClient } = require('mongodb');

const databaseHost = process.env.DATABASE_HOST || 'localhost:27017';
const numberQueries = process.env.NUM_QUERIES || 10000;
const database = process.env.DATABASE || 'businessinfo';

const connectToDb = async () => {
  const url = `mongodb://${databaseHost}`;
  const client = await MongoClient.connect(url);
  const restaurants = client.db(database).collection('restaurants');
  return { client, restaurants };
};

const queryRandomId = async (restaurants) => {
  const startTime = new Date();
  const randomId = Math.floor(Math.random() * 9999999).toString();
  await restaurants.find({ "result.place_id": randomId }).toArray();
  const endTime = new Date();
  const queryTime = endTime.getTime() - startTime.getTime();
  console.log(`Query time for id ${randomId} is: ${queryTime} ms`);
  return queryTime;
};

const logQueryTimes = async (numberQueries) => {
  const { client, restaurants } = await connectToDb();
  
  let cumulativeTime = 0;
  for (let i = 0; i < numberQueries; i++) {
    cumulativeTime += await queryRandomId(restaurants);
  }
  
  console.log(`Cumulative time for ${numberQueries} individual random id queries is: ${cumulativeTime} ms`);
  console.log(`Average time per query is: ${cumulativeTime/numberQueries} ms`);
};

logQueryTimes(numberQueries);
