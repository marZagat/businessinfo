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

const makeFakeRestaurant = (id) => {
  const stringifiedId = id.toString();
  const url = faker.internet.url();
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
      monday_open: fakeHoursData.periods[0].open.time,
      monday_close: fakeHoursData.periods[0].close.time,
      tuesday_open: fakeHoursData.periods[1].open.time,
      tuesday_close: fakeHoursData.periods[1].close.time,
      wednesday_open: fakeHoursData.periods[2].open.time,
      wednesday_close: fakeHoursData.periods[2].close.time,
      thursday_open: fakeHoursData.periods[3].open.time,
      thursday_close: fakeHoursData.periods[3].close.time,
      friday_open: fakeHoursData.periods[4].open.time,
      friday_close: fakeHoursData.periods[4].close.time,
      saturday_open: fakeHoursData.periods[5].open.time,
      saturday_close: fakeHoursData.periods[5].close.time,
      sunday_open: fakeHoursData.periods[6].open.time,
      sunday_close: fakeHoursData.periods[6].close.time,
    };
    return fakeRestaurant;
  };

  const fakeRestaurantRow = makeFakeRestaurant(stringifiedId);

  return { fakeRestaurantRow };
};

module.exports = makeFakeRestaurant;
