const faker = require('faker');

// *** Fake Hours Data Generator to make restaurant hours more realistic *** //
const generateHoursData = () => {
  const hoursData = {
    periods: [],
    weekdayText: [],
  };
  const openTimes = ['06', '07', '08', '09', '10', '11'];
  const closeTimes = ['18', '19', '20', '21', '22', '23'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i += 1) {
    const closeTime = closeTimes[Math.floor(Math.random() * 5)];
    const openTime = openTimes[Math.floor(Math.random() * 5)];
    const dailyHours = {
      close: {
        day: i,
        time: `${closeTime}00`,
      },
      open: {
        day: i,
        time: `${openTime}00`,
      },
    };
    hoursData.periods.push(dailyHours);

    const convertHoursToStandard = (militaryHour) => {
      let hour = parseInt(militaryHour, 10);
      if (hour > 12) {
        hour -= 12;
      }
      return hour.toString();
    };
    hoursData.weekdayText.push(`${weekdays[i]}: ${convertHoursToStandard(openTime)}:00 AM - ${convertHoursToStandard(closeTime)}:00 PM`);
  }

  return hoursData;
};

const generateRestaurant = (id) => {
  const stringifiedId = id.toString();
  const url = faker.internet.url();
  const hoursData = generateHoursData();
  const restaurant = {
    place_id: stringifiedId,
    formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`,
    international_phone_number: faker.phone.phoneNumber(),
    url,
    periods: hoursData.periods,
    weekday_text: hoursData.weekdayText,
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
  };
  return restaurant;
};

module.exports = generateRestaurant;
