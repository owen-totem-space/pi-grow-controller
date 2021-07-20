const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('A new client has connected');
  socket.emit('lightSet', lightValue);
  socket.emit('heatSet', heaterValue);
  socket.emit('fanSet', fanValue);
  socket.emit('humidSet', humidValue);
  socket.emit('dehumidSet', dehumidValue);

  socket.on('lightSwitch', (data) => {
    console.log('light switched');
    if (data === 1) {
      lightValue = 1;
    } else if (data === 0) {
      lightValue = 0;
    }
    // lights.writeSync(lightValue);
    io.emit('lightSet', lightValue);
  });

  socket.on('heatSwitch', (data) => {
    console.log('heater switched');
    if (data === 1) {
      heaterValue = 1;
    } else if (data === 0) {
      heaterValue = 0;
    }
    // heater.writeSync(heaterValue);
    io.emit('heatSet', heaterValue);
  });

  socket.on('fanSwitch', (data) => {
    console.log('fan switched');
    if (data === 1) {
      fanValue = 1;
    } else if (data === 0) {
      fanValue = 0;
    }
    // fan.writeSync(fanValue);
    io.emit('fanSet', fanValue);
  });

  socket.on('humidSwitch', (data) => {
    console.log('humidifier switched');
    if (data === 1) {
      humidValue = 1;
    } else if (data === 0) {
      humidValue = 0;
    }
    // humid.writeSync(humidValue);
    io.emit('humidSet', humidValue);
  });

  socket.on('dehumidSwitch', (data) => {
    console.log('dehumidifier switched');
    if (data === 1) {
      dehumidValue = 1;
    } else if (data === 0) {
      dehumidValue = 0;
    }
    // dehumid.writeSync(dehumidValue);
    io.emit('dehumidSet', dehumidValue);
  });

  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
});
