const faker = require('faker');

// *** Fake Hours Data Generator to make restaurant hours more realistic *** //
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

    const convertHoursToStandard = (militaryHour) => {
      let hour = parseInt(militaryHour);
      if (hour > 12) {
        hour = hour - 12;
      }
      return hour.toString();
    }
    fakeHoursData['weekdayText'].push(`${weekdays[i]}: ${convertHoursToStandard(openTime)}:00 AM - ${convertHoursToStandard(closeTime)}:00 PM`);
  }

  return fakeHoursData;
}

const makeFakeRestaurant = (id) => {
  id = id.toString();
  const url = faker.internet.url();
  const fakeHoursData = makeFakeHoursData();
  const fakeRestaurant = {
    "result": {
      "place_id": id,
      "name": faker.company.companyName(),
      "formatted_address": `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`,
      "international_phone_number": faker.phone.phoneNumber(),
      "website": url,
      // do i need to repeat this? seems like a good thing to take out
      "url": url,
      "opening_hours": {
        // make this more realistic
        // for now get random open_now, but ultimately this logic should be on front end and deleted from db
        "open_now": faker.random.boolean(),
        "periods": fakeHoursData.periods,
        // between periods and weekday test, info is redundant
        "weekday_text": fakeHoursData.weekdayText
      },
      "geometry": {
        "location": {
          "lat": faker.address.latitude(),
          "lng": faker.address.longitude()
        }
      }
    }
  }
  return fakeRestaurant;
}

module.exports = makeFakeRestaurant;