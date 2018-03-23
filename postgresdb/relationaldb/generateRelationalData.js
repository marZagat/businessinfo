const faker = require('faker');

// *** Fake Hours Data Generator to generate restaurant hours more realistic *** //
const generateHoursData = () => {
  const periods = [];

  const openTimes = ['06', '07', '08', '09', '10', '11'];
  const closeTimes = ['18', '19', '20', '21', '22', '23'];

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
    periods.push(dailyHours);
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

const generateWeekdayTextData = (periods) => {
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

const generateData = (id) => {
  const stringifiedId = id.toString();
  const hoursData = generateHoursData();
  const weekdayTextData = generateWeekdayTextData(hoursData);

  const generateRestaurant = (restaurantId) => {
    const restaurant = {
      place_id: restaurantId,
      formatted_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`,
      international_phone_number: faker.phone.phoneNumber(),
      url: faker.internet.url(),
      weekday_text: weekdayTextData,
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
    };
    return restaurant;
  };

  const generateHours = (restaurantId) => {
    const hours = [];
    const generateHourRow = (day) => {
      const hour = {
        restaurant_id: restaurantId,
        weekday: day,
        open_time: hoursData[day].open.time,
        close_time: hoursData[day].close.time,
      };
      return hour;
    };

    for (let i = 0; i < 7; i += 1) {
      hours.push(generateHourRow(i));
    }
    return hours;
  };

  const restaurantRow = generateRestaurant(stringifiedId);
  const hoursRows = generateHours(stringifiedId);

  return { restaurantRow, hoursRows };
};

module.exports = generateData;
