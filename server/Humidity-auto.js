const appUtil = require('./appUtil.js');
const { gpio, switchGPIO } = require('./gpio.js');

// TODO: Set Timers to 1 minute

class Humidity {
  constructor() {
    this.humidity = appUtil.getStateFromDatabase('humidity');
    this.highHumid = appUtil.getStateFromDatabase('humidityHigh');
    this.lowHumid = appUtil.getStateFromDatabase('humidityLow');
    this.humidifierState = appUtil.getStateFromDatabase('humidifier');
    this.fanState = appUtil.getStateFromDatabase('fan');
    this.dehumidifierState = appUtil.getStateFromDatabase('dehumidifier');
    this.io = null;
    this.socket = null;
    this.mode = appUtil.getFromDatabase('humidityAutomation');

    this._listenToHumidity();
  }

  /**
   * Public Functions
   */
  getHighHumidity = () => {
    this.highHumid = appUtil.getStateFromDatabase('humidityHigh');
    return this.highHumid;
  };
  setHighHumidity = (num) => {
    this.highHumid = num;
    return this;
  };
  getLowHumidity = () => {
    this.lowHumid = appUtil.getStateFromDatabase('humidityLow');
    return this.lowHumid;
  };
  setLowHumidity = (num) => {
    this.lowHumid = num;
    return this;
  };
  getHumidity = () => {
    this.humidity = appUtil.getStateFromDatabase('humidity');
    return this.humidity;
  };

  getMode = () => {
    this.mode = appUtil.getFromDatabase('humidityAutomation');
    return this.mode;
  };

  setSocket = (io, socket) => {
    this.io = io;
    this.socket = socket;
    return this;
  };

  manageHumidity = () => {
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
    console.log('Listening to humidity mode');
  };

  _automationOn = () => {
    const humidity = this.getHumidity();
    const lowHumidity = this.getLowHumidity();
    const highHumidity = this.getHighHumidity();

    if (humidity <= lowHumidity) {
      this._switchHumidifierOn();
      // console.log('too dry');
    }
    if (humidity >= highHumidity) {
      this._switchDehumidifierOn();
      // console.log('too humid');
    }
    if (humidity >= this._medianHumidity()) {
      this._switchHumidifierOff();
      // console.log('humid above median');
    }
    if (humidity <= this._medianHumidity()) {
      this._switchDehumidifierOff();
    }
    // console.log('Humidity automation active');
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
    this.humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (this.humidifierState === 1) return;
    appUtil.writeToDatabase('humidifier', 1);
    switchGPIO(gpio.humidifier, 1);
    this._sendMsg('humidSet', 1);
    console.log('humidifier switched on by automation');
  };

  _switchHumidifierOff = () => {
    this.humidifierState = appUtil.getStateFromDatabase('humidifier');

    if (this.humidifierState === 0) return;
    appUtil.writeToDatabase('humidifier', 0);
    switchGPIO(gpio.humidifier, 0);
    this._sendMsg('humidSet', 0);
    console.log('humidifier switched off by automation');
  };

  _switchDehumidifierOn = () => {
    this.dehumidifierState = appUtil.getStateFromDatabase('dehumidifier');

    if (this.dehumidifierState === 1) return;
    appUtil.writeToDatabase('dehumidifier', 1);
    switchGPIO(gpio.dehumidifier, 1);
    this._sendMsg('dehumidSet', 1);
    console.log('Dehumidifier switched on by automation');
  };

  _switchDehumidifierOff = () => {
    this.dehumidifierState = appUtil.getStateFromDatabase('dehumidifier');

    if (this.dehumidifierState === 0) return;
    appUtil.writeToDatabase('dehumidifier', 0);
    switchGPIO(gpio.dehumidifier, 0);
    this._sendMsg('dehumidSet', 0);
    console.log('Dehumidifier switched off by automation');
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

const humidityAutomation = new Humidity();
module.exports = humidityAutomation;
