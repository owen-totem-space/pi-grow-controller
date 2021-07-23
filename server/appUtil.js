const fs = require('fs');
const fileName = __dirname + '/switches.json';
const database = require(fileName);

module.exports = appUtil = {
  writeToDatabase(val, key) {
    database[key] = val.toString();

    fs.writeFileSync(fileName, JSON.stringify(database, null, 2));
  },

  getStateFromDatabase(key) {
    const file = fs.readFileSync(fileName, 'utf8');
    const data = JSON.parse(file);
    return parseInt(data[key]);
  },
};

/**
 , (err) => {
      if (err) return console.log(err);
      // console.log('writing to ' + fileName);
      // console.log(JSON.stringify(database));
    });
    */
