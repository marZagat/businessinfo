// const redisClient = require('redis').createClient;

// const redis = redisClient(6379, 'localhost');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
// const existsAsync = promisify(client.exists).bind(client);


client.on('error', (err) => {
  console.error(`Error ${err}`);
});


const database = require('../models/restaurant.js');

const getRestaurantById = id => database.find({ place_id: id })
  .then(result => result[0]);

const getRestaurantByIdCached = (id) => {
  client.exists(id, (err, reply) => {
    if (reply === 1) {
      console.log('it is in redis');
      return getAsync(id).then(res => JSON.parse(res));
    }
    console.log('not in redis');
    return database.find({ place_id: id })
      .then((result) => {
        setAsync(id, JSON.stringify(result));
      })
      .then(result => result[0]);
  });
};

module.exports = getRestaurantByIdCached;
