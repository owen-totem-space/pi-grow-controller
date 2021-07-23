const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const appUtil = require('./server/appUtil.js');
const humidityAutomation = require('./server/Humidity-auto.js');
const tempAutomation = require('./server/Temp-auto.js');
const lightAutomation = require('./server/Light-auto.js');

const PORT = 3000 || process.env.PORT;

// Middleware and static files
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true }));

// Route for frontend to access database file
app.get('/getState', function (req, res) {
  fs.readFile(__dirname + '/' + 'server/switches.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    res.send(data);
  });
});

app.post('/temp-settings', (req, res) => {
  console.log(req.body);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(humidityAutomation.manageHumidity, 5000);
  setInterval(tempAutomation.manageTemp, 5000);
  lightAutomation.manageLight();
});

// socket.io
io.on('connection', (socket) => {
  console.log('A new client has connected');
  socket.emit('lightSet', appUtil.getStateFromDatabase('light'));
  socket.emit('fanSet', appUtil.getStateFromDatabase('fan'));
  socket.emit('heatSet', appUtil.getStateFromDatabase('heater'));
  socket.emit('humidSet', appUtil.getStateFromDatabase('humidifier'));
  socket.emit('dehumidSet', appUtil.getStateFromDatabase('dehumidifier'));

  socket.on('lightSwitch', (newValue) => {
    appUtil.writeToDatabase(newValue, 'light');
    io.emit('lightSet', newValue);
    console.log('light switched in UI');
  });

  socket.on('fanSwitch', (newValue) => {
    appUtil.writeToDatabase(newValue, 'fan');
    io.emit('fanSet', newValue);
    console.log('fan switched in UI');
  });

  socket.on('heatSwitch', (newValue) => {
    appUtil.writeToDatabase(newValue, 'heater');
    io.emit('heatSet', newValue);
    console.log('heater switched in UI');
  });

  socket.on('humidSwitch', (newValue) => {
    appUtil.writeToDatabase(newValue, 'humidifier');
    io.emit('humidSet', newValue);
    console.log('humidifier switched in UI');
  });

  socket.on('dehumidSwitch', (newValue) => {
    appUtil.writeToDatabase(newValue, 'dehumidifier');
    io.emit('dehumidSet', newValue);
    console.log('dehumidifier switched in UI');
  });

  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });

  humidityAutomation.setSocket(socket);
  tempAutomation.setSocket(socket);
  lightAutomation.setSocket(socket);
});
