const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('redis connected');
});

const database = require('../models/restaurant.js');

module.exports = (id) => {
  return database.find({ place_id: id })
    .then((result) => {
      return result[0];
    });
};
