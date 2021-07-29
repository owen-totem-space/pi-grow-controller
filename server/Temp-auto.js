const appUtil = require('./appUtil.js');
const { gpio, switchGPIO } = require('./gpio.js');

// TODO: Set timers to 1 minute
class Temp {
  constructor() {
    this.temp = appUtil.getStateFromDatabase('temperature');
    this.highTemp = appUtil.getStateFromDatabase('tempHigh');
    this.lowTemp = appUtil.getStateFromDatabase('tempLow');
    this.heaterState = appUtil.getStateFromDatabase('heater');
    this.fanState = appUtil.getStateFromDatabase('fan');
    this.io = null;
    this.socket = null;
    this.mode = appUtil.getFromDatabase('tempAutomation');

    this._listenToTemp();
  }
  // Public
  getHighTemp = () => {
    this.highTemp = appUtil.getStateFromDatabase('tempHigh');
    return this.highTemp;
  };
  setHighTemp = (temp) => {
    this.highTemp = temp;
    return this;
  };
  getLowTemp = () => {
    this.lowTemp = appUtil.getStateFromDatabase('tempLow');
    return this.lowTemp;
  };
  setLowTemp = (temp) => {
    this.lowTemp = temp;
    console.log(this.lowTemp);
    return this;
  };
  getTemp = () => {
    this.temp = appUtil.getStateFromDatabase('temperature');
    return this.temp;
  };

  getMode = () => {
    this.mode = appUtil.getFromDatabase('tempAutomation');
    return this.mode;
  };

  setSocket = (socket) => {
    this.socket = socket;
    return socket;
  };

  manageTemp = () => {
    const checkMode = () => {
      const mode = this.getMode();

      if (mode === 'automationOn') {
        this._automationOn();
      }
      if (mode === 'automationOff') {
        return;
      }
    };
    checkMode();
    setInterval(checkMode, 5000);

    console.log('Listening to temperature mode');
  };

  // Private
  _automationOn = () => {
    const temp = this.getTemp();
    const lowTemp = this.getLowTemp();
    const highTemp = this.getHighTemp();

    if (temp <= lowTemp) {
      this._switchHeatOn();
      // console.log('temp too low');
    }
    if (temp >= highTemp) {
      this._switchHeatOff();
      this._switchFanOn();
      // console.log('temp too high');
    }
    if (temp >= this._medianTemp()) {
      this._switchHeatOff();
      // console.log('Temp above median');
    }
    // console.log('Temperature automation active');
  };

  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _listenToTemp = () => {
    setInterval(() => {
      this.temp = appUtil.getStateFromDatabase('temperature');
    }, 5000);
  };

  _medianTemp = () => {
    const diff = (this.highTemp - this.lowTemp) / 2;
    const medianTemp = diff + this.lowTemp;
    return medianTemp;
  };

  _switchHeatOn = () => {
    this.heaterState = appUtil.getStateFromDatabase('heater');

    if (this.heaterState === 1) return;
    appUtil.writeToDatabase('heater', 1);
    switchGPIO(gpio.heater, 1);
    this._sendMsg('heatSet', 1);
    console.log('Heater switched on by automation');
  };

  _switchHeatOff = () => {
    this.heaterState = appUtil.getStateFromDatabase('heater');

    if (this.heaterState === 0) return;
    appUtil.writeToDatabase('heater', 0);
    switchGPIO(gpio.heater, 0);
    this._sendMsg('heatSet', 0);
    console.log('Heater switched off by automation');
  };

  _switchFanOn = () => {
    this.fanState = appUtil.getStateFromDatabase('fan');

    if (this.fanState === 1) return;
    appUtil.writeToDatabase('fan', 1);
    switchGPIO(gpio.fan, 1);
    this._sendMsg('fanSet', 1);
    console.log('fan switched on by automation');
  };

  _switchFanOff = () => {
    this.fanState = appUtil.getStateFromDatabase('fan');

    if (this.fanState === 0) return;
    appUtil.writeToDatabase('fan', 0);
    switchGPIO(gpio.fan, 0);
    this._sendMsg('fanSet', 0);
    console.log('fan switched off by automation');
  };
}

const tempAutomation = new Temp();
module.exports = tempAutomation;
