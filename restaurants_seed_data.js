const faker = require('faker');
const Restaurant = require('./db/models/restaurant');

// make function to build restaurant with fake data
const makeFakeRestaurant = (id) => {
  const url = faker.internet.url();
  const fakeRestaurant = {
    result: {
      place_id: id,
      name: faker.company.catchPhrase(),
      formatted_address: `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()} ${faker.address.country()}`,
      international_phone_number: faker.phone.phoneNumber(),
      website: url,
      // do i need to repeat this?
      url: url,
      opening_hours: {
        open_now: faker.random.boolean(),
        periods: [
          {
            close: {
              // consider making this simply the weekday name
              day: faker.random.number() % 6,
              // consider making this more realistic
              time: `${faker.random.number() % 24}00`
            },
            open: {
              day: faker.random.number() % 6,
              time: `${faker.random.number() % 24}00`
            }
          }
        ],
        weekday_text: [
          "Monday: 8:00 AM – 6:00 PM",
          "Tuesday: 8:00 AM – 6:00 PM",
          "Wednesday: 8:00 AM – 6:00 PM",
          "Thursday: 8:00 AM – 6:00 PM",
          "Friday: 8:00 AM – 6:00 PM",
          "Saturday: 8:00 AM – 6:00 PM",
          "Sunday: 8:00 AM – 6:00 PM"
        ]
      },
      geometry: {
        location: {
          lat: faker.address.latitude(),
          lng: faker.address.longitude()
        }
      }
    }
  }
  return fakeRestaurant;
}

const fakeRestaurants = [];

const generateFakeRestaurantData = (ids) => {
  for (let i = 1; i <= ids; i++) {
    fakeRestaurants.push(makeFakeRestaurant(i));
  }
}

// works with 100000, seems to break or at least take more than 4 minutes on 1000000
generateFakeRestaurantData(10000);

console.log(fakeRestaurants);

