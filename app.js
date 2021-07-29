// Node and NPM modules
const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
// Webpack for Dev
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.js');
const compiler = webpack(config);

// My modules
const appUtil = require('./server/appUtil');
const { uiEvent, uiInit } = require('./server/uiHandler');
const humidityAutomation = require('./server/Humidity-auto.js');
const tempAutomation = require('./server/Temp-auto.js');
const lightAutomation = require('./server/Light-auto.js');
const fanAutomation = require('./server/Fan-auto.js');
const { initGPIO } = require('./server/gpio.js');

// Variables
const PORT = 3000 || process.env.PORT;

/**
 *  Middleware and static files
 */
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

/**
 *
 * Route for frontend to access database file
 *
 */
app.get('/getState', function (req, res) {
  fs.readFile(__dirname + '/' + 'server/switches.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    res.send(data);
  });
});

app.post('/light-selection', (req, res) => {
  const selection = req.body['light-selection'];
  appUtil.writeToDatabase('lightSelection', selection);
  res.redirect('/');
});

app.post('/fan-selection', (req, res) => {
  const selection = req.body['fan-selection'];
  appUtil.writeToDatabase('fanSelection', selection);
  res.redirect('/');
});

app.post('/light-settings', (req, res) => {
  const lightOn = req.body['switch-light-on'];
  // console.log(lightOn);
  appUtil.writeToDatabase('lightOn', lightOn);

  const lightOff = req.body['switch-light-off'];
  appUtil.writeToDatabase('lightOff', lightOff);

  lightAutomation.setTimeOn(lightOn);
  lightAutomation.setTimeOff(lightOff);
  res.redirect('/');
});

app.post('/fan-settings', (req, res) => {
  const fanOn = req.body['switch-fan-on'];
  // console.log(fanOn);
  appUtil.writeToDatabase('fanOn', fanOn);

  const fanOff = req.body['switch-fan-off'];
  appUtil.writeToDatabase('fanOff', fanOff);

  // fanAutomation.setTimeOn(fanOn);
  // fanAutomation.setTimeOff(fanOff);
  res.redirect('/');
});

app.post('/temp-settings', (req, res) => {
  // console.log(req.body);
  const tempLow = req.body['temp-low'];
  appUtil.writeToDatabase('tempLow', tempLow);

  const tempHigh = req.body['temp-high'];
  appUtil.writeToDatabase('tempHigh', tempHigh);

  // tempAutomation.setLowTemp(tempLow);
  // tempAutomation.setHighTemp(tempHigh);
  res.redirect('/');
});

app.post('/humidity-settings', (req, res) => {
  // console.log(req.body);
  const humidityLow = req.body['humidity-low'];
  appUtil.writeToDatabase('humidityLow', humidityLow);

  const humidityHigh = req.body['humidity-high'];
  appUtil.writeToDatabase('humidityHigh', humidityHigh);

  humidityAutomation.setLowHumidity(humidityLow);
  humidityAutomation.setHighHumidity(humidityHigh);
  res.redirect('/');
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
initAutomation();
initGPIO();
io.on('connection', onConnection);

/**
 *
 * Functions
 *
 */
function initAutomation() {
  humidityAutomation.manageHumidity();
  tempAutomation.manageTemp();
  lightAutomation.manageLight();
  fanAutomation.manageFan();
}

function onConnection(socket) {
  console.log('A new client has connected');
  uiInit(io, socket);
  uiEvent(io, socket);
  humidityAutomation.setSocket(io, socket);
  tempAutomation.setSocket(io, socket);
  lightAutomation.setSocket(io, socket);
  fanAutomation.setSocket(io, socket);

  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
}
