const appUtil = require('./appUtil.js');
// If humidity gets high, turn on fan or dehumidifier or both.
// If humidity gets low, turn on humidifier.
// TODO: add option to turn on/off auto manage humidity. wrap _manageHumdity in constructor with if statement

class Humidity {
  constructor() {
    this.humidity = 65;
    this.highHumid = 70;
    this.lowHumid = 60;
    this.humidifierState = appUtil.getStateFromDatabase('humidifier');
    this.fanState = appUtil.getStateFromDatabase('fan');
    this.io = null;
    this.socket = null;
    // update humidity value every minute
    this._listenToHumidity();
  }

  /**
   * Public Functions
   */
  getHighHumidity = () => {
    return this.highHumid;
  };
  setHighHumidity = (num) => {
    this.highHumid = num;
    return this;
  };
  getLowHumidity = () => {
    return this.lowHumid;
  };
  setLowHumidity = (num) => {
    this.lowHumid = num;
    return this;
  };
  getHumidity = () => {
    return this.humidity;
  };

  setSocket = (io, socket) => {
    this.io = io;
    this.socket = socket;
    return this;
  };

  manageHumidity = () => {
    setInterval(() => {
      const humidity = this.getHumidity();
      const lowHumidity = this.getLowHumidity();
      const highHumidity = this.getHighHumidity();

      if (humidity <= lowHumidity) {
        this._switchHumidifierOn();
        // console.log('too humid');
      }
      if (humidity >= highHumidity) {
        this._switchFanOn();
        // console.log('too dry');
      }
      if (humidity >= this._medianHumidity()) {
        this._switchHumidifierOff();
        // console.log('humid above median');
      }
    }, 5000);
  };

  /**
   * Private Functions
   */
  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _listenToHumidity = () => {
    setInterval(() => {
      this.humidity = appUtil.getStateFromDatabase('humidity'); // this will be value from sensor
    }, 5000);
    // console.log('listening to humidity');
  };

  _medianHumidity = () => {
    const diff = (this.highHumid - this.lowHumid) / 2;
    const medianHumidity = diff + this.lowHumid;
    return medianHumidity;
  };

  /**
   *
   */
  _switchHumidifierOn = () => {
    // const humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (this.humidifierState === 1) return;
    appUtil.writeToDatabase('humidifier', 1);
    this._sendMsg('humidSet', 1);
    console.log('humidifier switched on by automation');
  };

  _switchHumidifierOff = () => {
    // const humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (this.humidifierState === 0) return;
    appUtil.writeToDatabase('humidifier', 0);
    this._sendMsg('humidSet', 0);
    console.log('humidifier switched off by automation');
  };

  _switchFanOn = () => {
    // const fanState = appUtil.getStateFromDatabase('fan');

    if (this.fanState === 1) return;
    appUtil.writeToDatabase('fan', 0);
    this._sendMsg('fanSet', 1);
    console.log('fan switched on by automation');
  };

  _switchFanOff = () => {
    // const fanState = appUtil.getStateFromDatabase('fan');

    if (this.fanState === 0) return;
    appUtil.writeToDatabase('fan', 0);
    this._sendMsg('fanSet', 0);
    console.log('fan switched off by automation');
  };
}

const humidityAutomation = new Humidity();
module.exports = humidityAutomation;
