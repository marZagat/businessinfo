// const redisClient = require('redis').createClient;

// const redis = redisClient(6379, 'localhost');
const redis = require('redis');
const { promisify } = require('util');
const Promise = require('bluebird');

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
  return new Promise((resolve, reject) => {
    client.exists(id, (err, reply) => {
      if (reply === 1) {
        console.log('id is in redis');
        getAsync(id).then((res) => {
          resolve(JSON.parse(res));
        });
      } else {
        console.log('id not in redis');
        database.find({ place_id: id })
          .then((result) => {
            setAsync(id, JSON.stringify(result));
            resolve(result[0]);
          });
      }
    })
  });
};

module.exports = getRestaurantByIdCached;
