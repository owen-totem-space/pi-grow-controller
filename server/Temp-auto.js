const appUtil = require('./appUtil.js');
// If temperature gets too hot, turn on fan.
// If temperature gets too low, turn on heater.
class Temp {
  constructor() {
    this.temp = 25;
    this.highTemp = appUtil.getStateFromDatabase('tempHigh');
    this.lowTemp = appUtil.getStateFromDatabase('tempLow');
    this.socket = null;
    // update temperature value every minute
    this._listenToTemp();
  }
  // Public
  getHighTemp = () => {
    return this.highTemp;
  };
  setHighTemp = (temp) => {
    this.highTemp = temp;
    return this;
  };
  getLowTemp = () => {
    return this.lowTemp;
  };
  setLowTemp = (temp) => {
    this.lowTemp = temp;
    console.log(this.lowTemp);
    return this;
  };
  getTemp = () => {
    return this.temp;
  };

  setSocket = (socket) => {
    this.socket = socket;
    return socket;
  };

  manageTemp = () => {
    setInterval(() => {
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
    }, 5000);
  };

  // Private
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
    const heaterState = appUtil.getStateFromDatabase('heater');

    if (heaterState === 1) return;
    appUtil.writeToDatabase('heater', 1);
    this._sendMsg('heatSet', 1);
    console.log('Heater switched on by automation');
  };

  _switchHeatOff = () => {
    const heaterState = appUtil.getStateFromDatabase('heater');

    if (heaterState === 0) return;
    appUtil.writeToDatabase('heater', 0);
    this._sendMsg('heatSet', 0);
    console.log('Heater switched off by automation');
  };

  _switchFanOn = () => {
    const fanState = appUtil.getStateFromDatabase('fan');

    if (fanState === 1) return;
    appUtil.writeToDatabase('fan', 1);
    this._sendMsg('fanSet', 1);
    console.log('fan switched on by automation');
  };

  _switchFanOff = () => {
    const fanState = appUtil.getStateFromDatabase('fan');

    if (fanState === 0) return;
    appUtil.writeToDatabase('fan', 0);
    this._sendMsg('fanSet', 0);
    console.log('fan switched off by automation');
  };
}

const tempAutomation = new Temp();
module.exports = tempAutomation;
