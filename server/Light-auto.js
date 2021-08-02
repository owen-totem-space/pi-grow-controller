const appUtil = require('./appUtil.js');
const { gpio, switchGPIO } = require('./gpio.js');

class Lights {
  constructor() {
    this.io = null;
    this.socket = null;
    this.state = appUtil.getStateFromDatabase('light');
    // this.timeOn = appUtil.getFromDatabase('lightOn');
    // this.timeOff = appUtil.getFromDatabase('lightOff');
    // this.mode = appUtil.getFromDatabase('lightTimer');
  }
  // Public

  setSocket = (io, socket) => {
    this.io = io;
    this.socket = socket;
    return this;
  };

  getTimeOn = () => {
    const timeOn = appUtil.getFromDatabase('lightOn');
    return timeOn;
  };

  getTimeOff = () => {
    const timeOff = appUtil.getFromDatabase('lightOff');
    return timeOff;
  };

  getMode = () => {
    const mode = appUtil.getFromDatabase('lightTimer');
    return mode;
  };

  manageLight = () => {
    const checkMode = () => {
      const mode = this.getMode();

      if (mode === 'alwaysOn') {
        this._switchLightOn();
      }
      if (mode === 'timer') {
        this._timerMode();
      }
      if (mode === 'manual') {
        return;
      }
    };
    checkMode();
    setInterval(checkMode, 5000);
    console.log('Listening to light mode');
  };

  // Private
  _timerMode = () => {
    const timeOn = appUtil.parseTime(this.getTimeOn());
    const timeOff = appUtil.parseTime(this.getTimeOff());
    const timeNow = appUtil.timeNow();

    if (timeNow === timeOn) {
      this._switchLightOn();
    }
    if (timeNow === timeOff) {
      this._switchLightOff();
    }
    // console.log('Light timer active');
  };

  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _switchLightOn = () => {
    this.state = appUtil.getStateFromDatabase('light');

    if (this.state === 1) return;
    appUtil.writeToDatabase('light', 1);
    switchGPIO(gpio.light, 1);
    this._sendMsg('lightSet', 1);
    console.log('Light switched on by automation');
  };

  _switchLightOff = () => {
    this.state = appUtil.getStateFromDatabase('light');

    if (this.state === 0) return;
    appUtil.writeToDatabase('light', 0);
    switchGPIO(gpio.light, 0);
    this._sendMsg('lightSet', 0);
    console.log('Light switched off by automation');
  };
}

const lightAutomation = new Lights();
module.exports = lightAutomation;
