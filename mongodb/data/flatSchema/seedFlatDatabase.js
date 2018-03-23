require('dotenv').config();
const { MongoClient } = require('mongodb');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const generateRestaurant = require('./generateFlatData.js');

const databaseHost = process.env.DATABASE_HOST || 'localhost:27017';
const batchSize = parseInt(process.env.BATCH_SIZE, 10) || 10000;
const numRecords = parseInt(process.env.NUM_RECORDS, 10) || 100000;
const database = process.env.DATABASE || 'business_info_mongo_flat';
const collectionName = process.env.COLLECTION_NAME || 'restaurants';

const connectToDb = async () => {
  const url = `mongodb://${databaseHost}`;
  const client = await MongoClient.connect(url);
  const collection = client.db(database).collection(collectionName);
  return { client, collection };
};

const indexDb = async (collection) => {
  await collection.createIndex({ place_id: 1 }, { unique: true });
};

const seedBatch = (minId, maxId, collection) => {
  return new Promise(async (resolve, reject) => {
    const restaurantRows = [];
    for (let i = minId; i < maxId; i += 1) {
      restaurantRows.push(generateRestaurant(i));
    }
    try {
      const savedRestaurants = await collection.insertMany(restaurantRows);
      resolve(savedRestaurants);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

const logSeedTime = (startTime, startId, endId) => {
  const seedTime = (new Date().getTime() - startTime) / 1000;
  console.log(`Worker ${process.pid} done in ${seedTime} sec: ids ${startId}-${endId -1}`);
};

const seedDb = async (startId, endId) => {
  const startTime = new Date().getTime();

  try {
    const { client, collection } = await connectToDb();

    // seed in batches up to endId
    for (let i = startId; i < endId; i += batchSize) {
      const batchStart = i;
      const batchEnd = Math.min(i + batchSize, endId);
      await seedBatch(batchStart, batchEnd, collection);
    }

    // print out the runtime and close everything
    logSeedTime(startTime, startId, endId);
    client.close();
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

const createWorkers = () => {
  // fork workers
  const restaurantsPerWorker = Math.ceil(numRecords / numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    const startId = i * restaurantsPerWorker;
    const endId = Math.min(startId + restaurantsPerWorker, numRecords);
    cluster.fork({ START_ID: startId, END_ID: endId });
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} exited`);
  });
};

// create workers and seed db with each worker

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  createWorkers();
  
  process.on('beforeExit', async () => {
    try {
      console.log(`Master ${process.pid} indexing`);
      const { client, collection } = await connectToDb();
      await indexDb(collection);
      console.log('Done indexing');
      client.close();
      process.exit();
    } catch (error) {
      console.error(error);
    }
  });
} else {
  const startId = parseInt(process.env.START_ID, 10);
  const endId = parseInt(process.env.END_ID, 10);
  console.log(`Worker ${process.pid} starting for indices ${startId}-${endId - 1}`);
  seedDb(startId, endId);
}
