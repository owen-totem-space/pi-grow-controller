const appUtil = require('./appUtil');

const uiInit = (io, socket) => {
  socket.emit('lightSet', appUtil.getStateFromDatabase('light'));
  socket.emit('fanSet', appUtil.getStateFromDatabase('fan'));
  socket.emit('heatSet', appUtil.getStateFromDatabase('heater'));
  socket.emit('humidSet', appUtil.getStateFromDatabase('humidifier'));
  socket.emit('dehumidSet', appUtil.getStateFromDatabase('dehumidifier'));
};

const uiEvent = (io, socket) => {
  socket.on('lightSwitch', (newValue) => {
    appUtil.writeToDatabase('light', newValue);
    io.emit('lightSet', newValue);
    console.log(`Light switched by UI`);
  });

  socket.on('fanSwitch', (newValue) => {
    appUtil.writeToDatabase('fan', newValue);
    io.emit('fanSet', newValue);
    console.log(`Fan switched by UI`);
  });

  socket.on('heatSwitch', (newValue) => {
    appUtil.writeToDatabase('heater', newValue);
    io.emit('heatSet', newValue);
    console.log(`Heater switched by UI`);
  });

  socket.on('humidSwitch', (newValue) => {
    appUtil.writeToDatabase('humidifier', newValue);
    io.emit('humidSet', newValue);
    console.log(`Humidifier switched by UI`);
  });

  socket.on('dehumidSwitch', (newValue) => {
    appUtil.writeToDatabase('dehumidifier', newValue);
    io.emit('dehumidSet', newValue);
    console.log(`Dehumidifier switched by UI`);
  });
};

module.exports = {
  uiInit,
  uiEvent,
};