const redis = require('redis');
const { promisify } = require('util');
const Promise = require('bluebird');

const redisHost = process.env.REDIS_HOST || 'localhost';

const database = require('../models/restaurant.js');

const client = redis.createClient({ host: redisHost });

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

client.on('error', (err) => {
  console.error(`Error ${err}`);
});

const getRestaurantById = (id) => {
  return new Promise((resolve, reject) => {
    client.exists(id, (err, reply) => {
      if (err) reject(err);
      if (reply === 1) {
        getAsync(id).then((res) => {
          resolve(JSON.parse(res)[0]);
        });
      } else {
        database.find({ place_id: id })
          .then((result) => {
            setexAsync(id, 3600, JSON.stringify(result));
            resolve(result[0]);
          });
      }
    });
  });
};

module.exports = getRestaurantById;
