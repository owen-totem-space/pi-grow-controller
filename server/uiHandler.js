const appUtil = require('./appUtil');
const { gpio, switchGPIO } = require('./gpio');

const uiInit = (io, socket) => {
  socket.emit('lightSet', appUtil.getStateFromDatabase('light'));
  socket.emit('fanSet', appUtil.getStateFromDatabase('fan'));
  socket.emit('heatSet', appUtil.getStateFromDatabase('heater'));
  socket.emit('humidSet', appUtil.getStateFromDatabase('humidifier'));
  socket.emit('dehumidSet', appUtil.getStateFromDatabase('dehumidifier'));
  socket.emit('lightTimeSet', appUtil.getFromDatabase('lightTimer'));
  socket.emit('fanTimeSet', appUtil.getFromDatabase('fanTimer'));
  socket.emit('tempAutoSet', appUtil.getStateFromDatabase('tempAutomation'));
  socket.emit('humidityAutoSet', appUtil.getStateFromDatabase('humidityAutomation'));
};

const uiEvent = (io, socket) => {
  socket.on('lightSwitch', (newValue) => {
    appUtil.writeToDatabase('light', newValue);
    switchGPIO(gpio.light, newValue);
    io.emit('lightSet', newValue);
    console.log(`Light switched by UI`);
  });

  socket.on('fanSwitch', (newValue) => {
    appUtil.writeToDatabase('fan', newValue);
    switchGPIO(gpio.fan, newValue);
    io.emit('fanSet', newValue);
    console.log(`Fan switched by UI`);
  });

  socket.on('heatSwitch', (newValue) => {
    appUtil.writeToDatabase('heater', newValue);
    switchGPIO(gpio.heater, newValue);
    io.emit('heatSet', newValue);
    console.log(`Heater switched by UI`);
  });

  socket.on('humidSwitch', (newValue) => {
    appUtil.writeToDatabase('humidifier', newValue);
    switchGPIO(gpio.humidifier, newValue);
    io.emit('humidSet', newValue);
    console.log(`Humidifier switched by UI`);
  });

  socket.on('dehumidSwitch', (newValue) => {
    appUtil.writeToDatabase('dehumidifier', newValue);
    switchGPIO(gpio.dehumidifier, newValue);
    io.emit('dehumidSet', newValue);
    console.log(`Dehumidifier switched by UI`);
  });

  socket.on('lightTimeSwitch', (newValue) => {
    appUtil.writeToDatabase('lightTimer', newValue);
    io.emit('lightTimeSet', newValue);
    console.log(`Light Timer switched by UI`);
  });

  socket.on('fanTimeSwitch', (newValue) => {
    appUtil.writeToDatabase('fanTimer', newValue);
    io.emit('fanTimeSet', newValue);
    console.log(`Fan Timer switched by UI`);
  });

  socket.on('tempAutoSwitch', (newValue) => {
    appUtil.writeToDatabase('tempAutomation', newValue);
    io.emit('tempAutoSet', newValue);
    console.log('Temp automation changed in UI');
  });

  socket.on('humidityAutoSwitch', (newValue) => {
    appUtil.writeToDatabase('humidityAutomation', newValue);
    io.emit('humidityAutoSet', newValue);
    console.log('Humidity automation changed in UI');
  });
};

module.exports = {
  uiInit,
  uiEvent,
};
