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
const config = require('../webpack.dev.js');
const compiler = webpack(config);

// My modules
const appUtil = require('./appUtil');
const { uiEvent, uiInit } = require('./uiHandler');
const humidityAutomation = require('./Humidity-auto.js');
const tempAutomation = require('./Temp-auto.js');
const lightAutomation = require('./Light-auto.js');
const fanAutomation = require('./Fan-auto.js');
const { initGPIO } = require('./gpio.js');

// Variables
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/**
 *  Middleware and static files
 */
app.use(express.static(path.join(__dirname, '../', 'dist')));
app.use(express.urlencoded({ extended: true }));
/**
 * Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
 * REMOVE FOR PRODUCTION
 */
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

/**
 * Initialise connections
 */
initAutomation();
initGPIO();
io.on('connection', onConnection);

/**
 *
 * Route for frontend to access database file
 *
 */

app.get('/getState', (req, res) => {
  fs.readFile(__dirname + '/' + 'switches.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    res.send(data);
  });
});

app.post('/light-settings', (req, res) => {
  const lightOn = req.body['switch-light-on'];
  appUtil.writeToDatabase('lightOn', lightOn);

  const lightOff = req.body['switch-light-off'];
  appUtil.writeToDatabase('lightOff', lightOff);

  res.redirect('/');
});

app.post('/fan-settings', (req, res) => {
  const fanOn = req.body['switch-fan-on'];
  appUtil.writeToDatabase('fanOn', fanOn);

  const fanOff = req.body['switch-fan-off'];
  appUtil.writeToDatabase('fanOff', fanOff);

  res.redirect('/');
});

app.post('/temp-settings', (req, res) => {
  const tempLow = req.body['temp-low'];
  appUtil.writeToDatabase('tempLow', tempLow);

  const tempHigh = req.body['temp-high'];
  appUtil.writeToDatabase('tempHigh', tempHigh);

  res.redirect('/');
});

app.post('/humidity-settings', (req, res) => {
  const humidityLow = req.body['humidity-low'];
  appUtil.writeToDatabase('humidityLow', humidityLow);

  const humidityHigh = req.body['humidity-high'];
  appUtil.writeToDatabase('humidityHigh', humidityHigh);

  res.redirect('/');
});

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
