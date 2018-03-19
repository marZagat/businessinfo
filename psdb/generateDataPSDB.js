const faker = require('faker');

// *** Fake Hours Data Generator to make restaurant hours more realistic *** //
const makeFakeHoursData = () => {
  const fakeHoursData = {
    periods: [],
    weekdayText: [],
  };
  const openTimes = ['06', '07', '08', '09', '10', '11'];
  const closeTimes = ['18', '19', '20', '21', '22', '23'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i += 1) {
    const closeTime = closeTimes[Math.floor(Math.random() * 5)];
    const openTime = openTimes[Math.floor(Math.random() * 5)];
    const fakeDailyHours = {
      close: {
        day: i,
        time: `${closeTime}00`,
      },
      open: {
        day: i,
        time: `${openTime}00`,
      },
    };
    fakeHoursData.periods.push(fakeDailyHours);

    const convertHoursToStandard = (militaryHour) => {
      let hour = parseInt(militaryHour, 10);
      if (hour > 12) {
        hour -= 12;
      }
      return hour.toString();
    };
    fakeHoursData.weekdayText.push(`${weekdays[i]}: ${convertHoursToStandard(openTime)}:00 AM - ${convertHoursToStandard(closeTime)}:00 PM`);
  }

  return fakeHoursData;
};

const makeFakeData = (id) => {
  const stringifiedId = id.toString();
  const fakeHoursData = makeFakeHoursData();

  const makeFakeRestaurant = (restaurantId) => {
    const fakeRestaurant = {
      place_id: restaurantId,
      formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`,
      international_phone_number: faker.phone.phoneNumber(),
      url: faker.internet.url(),
      weekday_text: fakeHoursData.weekdayText,
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
    };
    return fakeRestaurant;
  };

  const makeFakeHours = (restaurantId) => {
    const fakeHours = [];
    const makeFakeHourRow = (day) => {
      const fakeHour = {
        restaurant_id: restaurantId,
        weekday: day,
        open_time: fakeHoursData.periods[day].open.time,
        close_time: fakeHoursData.periods[day].close.time
      };
      return fakeHour;
    };

    for (let i = 0; i < 7; i += 1) {
      fakeHours.push(makeFakeHourRow(i));
    }

    return fakeHours;
  };

  const fakeRestaurantRow = makeFakeRestaurant(stringifiedId);
  const fakeHoursRows = makeFakeHours(stringifiedId);

  return { fakeRestaurantRow, fakeHoursRows };
};

module.exports = makeFakeData;
