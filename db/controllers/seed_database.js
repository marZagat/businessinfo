var data = require('../../fakeDataGenerator.js');
var database = require('../models/restaurant.js');

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

// build insert function with async await
// try using async await to drop database and then insert data
// then try to use async await to build an array of 10000 records
// save them all
// wait until done
// batch another, and repeat

// async seedDatabase = () => {
//   await database.dropDatabase();
//   await database.insert(data);
// };

// seedDatabase().catch(error => console.error(error.stack));