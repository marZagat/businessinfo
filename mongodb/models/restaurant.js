const mongoose = require('mongoose');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
mongoose.connect(`mongodb://${databaseHost}/businessinfo`);

const restaurantSchema = mongoose.Schema({
  place_id: { type: String, unique: true },
  formatted_address: String,
  international_phone_number: String,
  url: String,
  periods: [
    {
      close: {
        day: Number,
        time: String,
      },
      open: {
        day: Number,
        time: String,
      },
    },
  ],
  weekday_text: [String],
  lat: Number,
  lng: Number,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const find = queryObj => Restaurant.find(queryObj);

const insert = documents => Restaurant.insertMany(documents);

const remove = queryObj => Restaurant.remove(queryObj);

const count = queryObj => Restaurant.count(queryObj);

// database functions
exports.find = find;
exports.insert = insert;
exports.remove = remove;
exports.count = count;

// misc objects for testing and database seeding
exports.Restaurant = Restaurant;
exports.mongoose = mongoose;
