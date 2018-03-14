var data = require('../../fakeDataGenerator.js');
var database = require('../models/restaurant.js');

console.log(data[0]);

database.insert(data)
  .then((response) => {
    database.mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Failed to seed database');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    database.mongoose.disconnect();
  });
