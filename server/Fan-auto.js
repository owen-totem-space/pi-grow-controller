const appUtil = require('./appUtil.js');
const { gpio, switchGPIO } = require('./gpio.js');

class Fan {
  constructor() {
    this.io = null;
    this.socket = null;
    this.state = appUtil.getStateFromDatabase('fan');
    this.timeOn = appUtil.getFromDatabase('fanOn');
    this.timeOff = appUtil.getFromDatabase('fanOff');
    this.mode = appUtil.getFromDatabase('fanSelection');
  }

  // Public
  getTimeOn = () => {
    this.timeOn = appUtil.getFromDatabase('fanOn');
    return this.timeOn;
  };

  setTimeOn = (time) => {
    this.timeOn = time;
    return this;
  };

  getTimeOff = () => {
    this.timeOff = appUtil.getFromDatabase('fanOff');
    return this.timeOff;
  };

  setTimeOff = (time) => {
    this.timeOff = time;
    return this;
  };

  getMode = () => {
    this.mode = appUtil.getFromDatabase('fanSelection');
    return this.mode;
  };

  setSocket = (io, socket) => {
    this.socket = socket;
    return this;
  };

  manageFan = () => {
    const checkMode = () => {
      const mode = this.getMode();

      if (mode === 'always-on') {
        this._switchFanOn();
      }
      if (mode === 'on-timer') {
        this._timerMode();
      }
      if (mode === 'manual') {
        return;
      }
    };
    checkMode();
    setInterval(checkMode, 5000);
    console.log('Listening to fan Mode');
  };

  // Private
  _timerMode = () => {
    const timeOn = appUtil.parseTime(this.getTimeOn());
    const timeOff = appUtil.parseTime(this.getTimeOff());
    const timeNow = appUtil.timeNow();

    if (timeNow === timeOn) {
      this._switchFanOn();
    }
    if (timeNow === timeOff) {
      this._switchFanOff();
    }
    // console.log('Fan timer active');
  };

  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _switchFanOn = () => {
    this.state = appUtil.getStateFromDatabase('fan');

    if (this.state === 1) return;
    appUtil.writeToDatabase('fan', 1);
    switchGPIO(gpio.fan, 1);
    this._sendMsg('fanSet', 1);
    console.log('Fan switched on by automation');
  };

  _switchFanOff = () => {
    this.state = appUtil.getStateFromDatabase('fan');

    if (this.state === 0) return;
    appUtil.writeToDatabase('fan', 0);
    switchGPIO(gpio.fan, 0);
    this._sendMsg('fanSet', 0);
    console.log('Fan switched off by automation');
  };
}

const fanAutomation = new Fan();
module.exports = fanAutomation;
