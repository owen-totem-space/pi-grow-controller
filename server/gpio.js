// const Gpio = require('onoff').Gpio;
const appUtil = require('./appUtil.js');

class Gpio {
  constructor(port, str) {
    this.port = port;
    this.str = str;
    this.state = 0;
  }
  writeSync = (val) => {
    this.state = val;
    // if (this.state === 1) console.log(`${this.port} is on`);
    // else if (this.state === 0) console.log(`${this.port} is off`);
    // else console.log(`Error in ${this.port} ${this.state}`);
  };
  unexport = () => {
    console.log(`${this.val} unexported`);
  };
}

const gpio = {
  light: new Gpio(26, 'out'),
  heater: new Gpio(27, 'out'),
  fan: new Gpio(28, 'out'),
  humidifier: new Gpio(25, 'out'),
  dehumidifier: new Gpio(20, 'out'),
  tempSensor: new Gpio(15, 'out'),
  humiditySensor: new Gpio(16, 'out'),
  soilMoistureSensor: new Gpio(17, 'out'),
};

function switchGPIO(gpio, val) {
  gpio.writeSync(val);
  console.log(`${gpio.port} switched to ${val}`);
}

function runGPIO() {
  process.on('SIGINT', () => {
    gpio.light.writeSync(0);
    gpio.light.unexport();

    gpio.heater.writeSync(0);
    gpio.heater.unexport();

    gpio.fan.writeSync(0);
    gpio.fan.unexport();

    gpio.humidifier.writeSync(0);
    gpio.humidifier.unexport();

    gpio.dehumidifier.writeSync(0);
    gpio.dehumidifier.unexport();

    process.exit();
  });
}

function initGPIO() {
  gpio.light.writeSync(appUtil.getStateFromDatabase('light'));
  gpio.heater.writeSync(appUtil.getStateFromDatabase('heater'));
  gpio.fan.writeSync(appUtil.getStateFromDatabase('fan'));
  gpio.humidifier.writeSync(appUtil.getStateFromDatabase('humidifier'));
  gpio.dehumidifier.writeSync(appUtil.getStateFromDatabase('dehumidifier'));

  console.log(`GPIO's set`);
}

module.exports = { gpio, switchGPIO, initGPIO };
