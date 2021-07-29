const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, '/switches.json');
const database = require(fileName);
const dayjs = require('dayjs');

module.exports = appUtil = {
  writeToDatabase(key, val) {
    database[key] = val.toString();

    fs.writeFileSync(fileName, JSON.stringify(database, null, 2));
  },

  getStateFromDatabase(key) {
    const file = fs.readFileSync(fileName, 'utf8');
    const data = JSON.parse(file);
    return parseInt(data[key]);
  },

  getFromDatabase(key) {
    const file = fs.readFileSync(fileName, 'utf8');
    const data = JSON.parse(file);
    return data[key];
  },

  parseTime(timeStr) {
    const arr = timeStr.split(':');
    const hour = parseInt(arr[0]);
    const min = parseInt(arr[1]);
    let time = dayjs().hour(hour).minute(min).second(0);
    time = dayjs(time).format('HH:mm');
    return time;
  },

  timeNow() {
    let time = dayjs();
    time = dayjs(time).format('HH:mm');
    return time;
  },
};
