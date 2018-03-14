const faker = require('faker');
const Restaurant = require('./db/models/restaurant');

// make empty restaurants array
const fakeRestaurants = [];

// make function to build restaurant with fake data
const makeFakeRestaurant = () => {
  const companyName = faker.company.companyName();
  const fakeRestaurant = {
    result: {
      place_id: Math.floor(Math.random() * 10000000),
      name: faker.company.catchPhrase(),
      formatted_address: `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()} ${faker.address.country()}`,
      international_phone_number: faker.phone.phoneNumber(),
      website: `www.${companyName}.com`,
      // do i need to repeat this?
      url: `www.${companyName}.com`,
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
}

// loop through to a number and add it to the restaurants array

// 

