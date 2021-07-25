const fs = require('fs');
const fileName = __dirname + '/switches.json';
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

  parseTime(str) {
    let time = dayjs('1/1/1 ' + str, 'HH:mm');

    if (time.$m < 10) {
      time = time.$H.toString() + '0' + time.$m.toString();
      time = parseInt(time);
    } else {
      time = time.$H.toString() + time.$m.toString();
      time = parseInt(time);
    }
    return time;
  },

  timeNow() {
    let time = dayjs();

    if (time.$m < 10) {
      time = time.$H.toString() + '0' + time.$m.toString();
      time = parseInt(time);
    } else {
      time = time.$H.toString() + time.$m.toString();
      time = parseInt(time);
    }
    return time;
  },
};

/**
 , (err) => {
      if (err) return console.log(err);
      // console.log('writing to ' + fileName);
      // console.log(JSON.stringify(database));
    });
    */
