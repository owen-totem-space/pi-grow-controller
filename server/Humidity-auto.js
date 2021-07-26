const appUtil = require('./appUtil.js');

// TODO: Set Timers to 1 minute

class Humidity {
  constructor() {
    this.humidity = appUtil.getStateFromDatabase('humidity');
    this.highHumid = appUtil.getStateFromDatabase('humidityHigh');
    this.lowHumid = appUtil.getStateFromDatabase('humidityLow');
    this.humidifierState = appUtil.getStateFromDatabase('humidifier');
    this.fanState = appUtil.getStateFromDatabase('fan');
    this.io = null;
    this.socket = null;

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
        // console.log('too dry');
      }
      if (humidity >= highHumidity) {
        this._switchFanOn();
        // console.log('too humid');
      }
      if (humidity >= this._medianHumidity()) {
        this._switchHumidifierOff();
        // console.log('humid above median');
      }
    }, 5000);
    console.log('Humidity automation active');
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
    const humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (humidifierState === 1) return;
    appUtil.writeToDatabase('humidifier', 1);
    this._sendMsg('humidSet', 1);
    console.log('humidifier switched on by automation');
  };

  _switchHumidifierOff = () => {
    const humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (humidifierState === 0) return;
    appUtil.writeToDatabase('humidifier', 0);
    this._sendMsg('humidSet', 0);
    console.log('humidifier switched off by automation');
  };

  _switchFanOn = () => {
    const fanState = appUtil.getStateFromDatabase('fan');

    if (fanState === 1) return;
    appUtil.writeToDatabase('fan', 0);
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

const humidityAutomation = new Humidity();
module.exports = humidityAutomation;
