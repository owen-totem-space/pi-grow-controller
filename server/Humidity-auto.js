const appUtil = require('./appUtil.js');
// If humidity gets high, turn on fan or dehumidifier or both.
// If humidity gets low, turn on humidifier.
// TODO: add option to turn on/off auto manage humidity. wrap _manageHumdity in constructor with if statement

class Humidity {
  constructor() {
    this.humidity = 65;
    this.highHumid = 70;
    this.lowHumid = 60;
    this.socket = null;
    // update humidity value every minute
    setInterval(this._listenToHumidity, 5000);
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

  setSocket = (socket) => {
    this.socket = socket;
    return socket;
  };

  manageHumidity = () => {
    const humidity = this.getHumidity();
    const lowHumidity = this.getLowHumidity();
    const highHumidity = this.getHighHumidity();

    if (humidity <= lowHumidity) {
      this._switchHumidifierOn();
    }
    if (humidity >= highHumidity) {
      this._switchFanOn();
    }
    if (humidity >= this._medianHumidity()) {
      this._switchHumidifierOff();
    }
  };

  /**
   * Private Functions
   */
  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _listenToHumidity = () => {
    this.humidity = appUtil.getStateFromDatabase('humidity'); // this will be value from sensor
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
    const humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (humidifierState === 1) return;
    appUtil.writeToDatabase(1, 'humidifier');
    this._sendMsg('humidSet', 1);
    console.log('humidifier switched on by automation');
  };

  _switchHumidifierOff = () => {
    const humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (humidifierState === 0) return;
    appUtil.writeToDatabase(0, 'humidifier');
    this._sendMsg('humidSet', 0);
    console.log('humidifier switched off by automation');
  };

  _switchFanOn = () => {
    const fanState = appUtil.getStateFromDatabase('fan');

    if (fanState === 1) return;
    appUtil.writeToDatabase(1, 'fan');
    this._sendMsg('fanSet', 1);
    console.log('fan switched on by automation');
  };

  _switchFanOff = () => {
    const fanState = appUtil.getStateFromDatabase('fan');

    if (fanState === 0) return;
    appUtil.writeToDatabase(0, 'fan');
    this._sendMsg('fanSet', 0);
    console.log('fan switched off by automation');
  };
}

const humidityAutomation = new Humidity();
module.exports = humidityAutomation;
