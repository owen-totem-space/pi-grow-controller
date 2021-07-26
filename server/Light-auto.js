const appUtil = require('./appUtil.js');

class Lights {
  constructor() {
    this.io = null;
    this.socket = null;
    this.state = appUtil.getStateFromDatabase('light');
    this.timeOn = appUtil.getFromDatabase('lightOn');
    this.timeOff = appUtil.getFromDatabase('lightOff');
  }
  // Public
  getTimeOn = () => {};

  setTimeOn = (time) => {
    this.timeOn = time;
    return this;
  };

  getTimeOff = () => {};

  setTimeOff = (time) => {
    this.timeOff = time;
    return this;
  };

  setSocket = (io, socket) => {
    this.socket = socket;
    return this;
  };

  manageLight = () => {
    setInterval(() => {
      const timeOn = appUtil.parseTime(this.timeOn);
      const timeOff = appUtil.parseTime(this.timeOff);
      const timeNow = appUtil.timeNow();
      // console.log('time on: ' + timeOn);
      // console.log('time off: ' + timeOff);
      // console.log('timenow: ' + timeNow);

      if (timeNow === timeOn) {
        this._switchLightOn();
      }
      if (timeNow === timeOff) {
        this._switchLightOff();
      }
    }, 20000);
    console.log('Light automation active');
  };

  // Private
  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _switchLightOn = () => {
    this.state = appUtil.getStateFromDatabase('light');

    if (this.state === 1) return;
    appUtil.writeToDatabase('light', 1);
    this._sendMsg('lightSet', 1);
    console.log('Light switched on by automation');
  };

  _switchLightOff = () => {
    this.state = appUtil.getStateFromDatabase('light');

    if (this.state === 0) return;
    appUtil.writeToDatabase('light', 0);
    this._sendMsg('lightSet', 0);
    console.log('Light switched off by automation');
  };
}

const lightAutomation = new Lights();
module.exports = lightAutomation;
