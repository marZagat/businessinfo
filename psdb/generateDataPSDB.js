const faker = require('faker');

// *** Fake Hours Data Generator to make restaurant hours more realistic *** //
const makeFakeHoursData = () => {
  const periods = [];

  const openTimes = ['06', '07', '08', '09', '10', '11'];
  const closeTimes = ['18', '19', '20', '21', '22', '23'];

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
    periods.push(fakeDailyHours);
  }

  return periods;
};

const convertHoursToStandard = (militaryHour) => {
  let hour = parseInt(militaryHour, 10);
  if (hour > 12) {
    hour -= 12;
  }
  return hour.toString();
};

const makeFakeWeekdayTextData = (periods) => {
  const weekdayText = [];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i += 1) {
    const openTime = periods[i].open.time.slice(0, 2);
    const closeTime = periods[i].close.time.slice(0, 2);
    const convertedOpenTime = convertHoursToStandard(openTime);
    const convertedCloseTime = convertHoursToStandard(closeTime);
    weekdayText.push(`${weekdays[i]}: ${convertedOpenTime}:00 AM - ${convertedCloseTime}:00 PM`);
  }

  return weekdayText;
};

const makeFakeData = (id) => {
  const stringifiedId = id.toString();
  const fakeHoursData = makeFakeHoursData();
  const fakeWeekdayTextData = makeFakeWeekdayTextData(fakeHoursData);

  const makeFakeRestaurant = (restaurantId) => {
    const fakeRestaurant = {
      place_id: restaurantId,
      formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`,
      international_phone_number: faker.phone.phoneNumber(),
      url: faker.internet.url(),
      weekday_text: fakeWeekdayTextData,
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
        open_time: fakeHoursData[day].open.time,
        close_time: fakeHoursData[day].close.time,
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
