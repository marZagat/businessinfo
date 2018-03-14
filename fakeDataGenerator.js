const faker = require('faker');

// make fake hours data array
const makeFakeHoursData = () => {
  const fakeHoursData = {
    'periods': [],
    'weekdayText': []
  };
  const openTimes = ['06', '07', '08', '09', '10', '11'];
  const closeTimes = ['18', '19', '20', '21', '22', '23'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i++) {
    let closeTime = closeTimes[Math.floor(Math.random() * 5)];
    let openTime = openTimes[Math.floor(Math.random() * 5)];
    let fakeDailyHours = {
      close: {
        day: i,
        time: `${closeTime}00`
      },
      open: {
        day: i,
        time: `${openTime}00`
      }
    }
    fakeHoursData['periods'].push(fakeDailyHours);

    const convertHours = (militaryHour) => {
      // convert string to number
      // modulo number by 12
      // convert back to string
      let hour = parseInt(militaryHour);
      if (hour > 12) {
        hour = hour - 12;
      }
      return hour.toString();
    }
    fakeHoursData['weekdayText'].push(`${weekdays[i]}: ${convertHours(openTime)}:00 AM - ${convertHours(closeTime)}:00 PM`);
  }

  return fakeHoursData;
}


const makeFakeRestaurant = (id) => {
  const url = faker.internet.url();
  const fakeHoursData = makeFakeHoursData();
  const fakeRestaurant = {
    result: {
      place_id: id,
      name: faker.company.companyName(),
      formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`,
      international_phone_number: faker.phone.phoneNumber(),
      website: url,
      // do i need to repeat this? seems like a good thing to take out
      url: url,
      opening_hours: {
        // make this more realistic
        // for now get random open_now, but ultimately this logic should be on front end and deleted from db
        open_now: faker.random.boolean(),
        periods: fakeHoursData.periods,
        // between periods and weekday test, info is redundant
        weekday_text: fakeHoursData.weekdayText
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
generateFakeRestaurantData(100);

console.log(fakeRestaurants[0].result.opening_hours.periods);
console.log(fakeRestaurants[0].result.opening_hours)

module.exports = fakeRestaurants;