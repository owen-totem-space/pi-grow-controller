const path = require('path');
const http = require('http');
const express = require('express');
// const Gpio = require('onoff').Gpio;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// ==========================================================
// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // onStartup();
});

/**
 *
 *
 * ONOFF functions
 *
 *
 */

// ONOFF VARIABLES
let lightValue = 1;
let heaterValue = 0;
let fanValue = 0;
let humidValue = 0;
let dehumidValue = 0;

/*
const lights = new Gpio(26, 'out');
const heater = new Gpio(27, 'out');
const fan = new Gpio(28, 'out');
const humid = new Gpio(29, 'out');
const dehumid = new Gpio(30, 'out');
const tempSensor = new Gpio(15, 'out');
const humidSensor = new Gpio(16, 'out');

// Execute when web server starts up
const onStartup = () => {
  lights.writeSync(lightValue);
  heater.writeSync(heaterValue);
  fan.writeSync(fanValue);
  humid.writeSync(humidValue);
  dehumid.writeSync(dehumidValue);

  console.log(`Started`);
};

// Execute when web server is terminated
process.on('SIGINT', () => {
  lights.writeSync(0);
  lights.unexport();

  heater.writeSync(0);
  heater.unexport();

  fan.writeSync(0);
  fan.unexport();

  humid.writeSync(0);
  humid.unexport();

  dehumid.writeSync(0);
  dehumid.unexport();

  process.exit();
});

*/

/**
 *
 * socket.io
 *
 */
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
