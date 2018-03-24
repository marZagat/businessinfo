const redis = require('redis');

const redisClient = redis.createClient();

const redis = redisClient(6379, 'localhost');

const database = require('../models/restaurant.js');

const getRestaurantById = (id) => {
  return database.find({ place_id: id })
    .then((result) => {
      return result[0];
    });
};
