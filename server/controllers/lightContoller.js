const appUtil = require('../appUtil');
const { gpio, switchGPIO } = require('../gpio');

const setLight = (newValue) => {
  // read database
  const state = appUtil.getStateFromDatabase('light');
  // if switch already on, exit
  if (state === newValue) return;
  // turn light on
  appUtil.writeToDatabase('light', newValue);
  switchGPIO(gpio.light, newValue);
  io.emit('lightSet', newValue);
};

module.exports = {
  setLight,
  turnLightOff,
};
