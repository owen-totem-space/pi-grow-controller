const appUtil = require('./appUtil.js');

class Fan {
  constructor() {
    this.io = null;
    this.socket = null;
    this.state = appUtil.getStateFromDatabase('fan');
    this.timeOn = appUtil.getFromDatabase('fanOn');
    this.timeOff = appUtil.getFromDatabase('fanOff');
  }

  // Public
  getTimeOn = () => {
    return this.timeOn;
  };

  setTimeOn = (time) => {
    this.timeOn = time;
    return this;
  };

  getTimeOff = () => {
    return this.timeOff;
  };

  setTimeOff = (time) => {
    this.timeOff = time;
    return this;
  };

  setSocket = (io, socket) => {
    this.socket = socket;
    return this;
  };

  manageFan = () => {
    setInterval(() => {
      const timeOn = appUtil.parseTime(this.timeOn);
      const timeOff = appUtil.parseTime(this.timeOff);
      const timeNow = appUtil.timeNow();
      // console.log('time on: ' + timeOn);
      // console.log('time off: ' + timeOff);
      // console.log('timenow: ' + timeNow);

      if (timeNow === timeOn) {
        this._switchFanOn();
      }
      if (timeNow === timeOff) {
        this._switchFanOff();
      }
    }, 20000);
    console.log('Fan automation active');
  };

  // Private
  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _switchFanOn = () => {
    this.state = appUtil.getStateFromDatabase('fan');

    if (this.state === 1) return;
    appUtil.writeToDatabase('fan', 1);
    this._sendMsg('fanSet', 1);
    console.log('Fan switched on by automation');
  };

  _switchFanOff = () => {
    this.state = appUtil.getStateFromDatabase('fan');

    if (this.state === 0) return;
    appUtil.writeToDatabase('fan', 0);
    this._sendMsg('fanSet', 0);
    console.log('Fan switched off by automation');
  };
}

const fanAutomation = new Fan();
module.exports = fanAutomation;
