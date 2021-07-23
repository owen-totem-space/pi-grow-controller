const appUtil = require('./appUtil.js');
// Timer for lights.
// time inputs for on and off.
// button for 24hrs
class Lights {
  constructor() {
    this.socket = null;
    this.state = 1;
    this.timeOn = true;
    this.timeOff = false;
  }
  // Public
  getTimeOn = () => {};
  setTimeOn = () => {};
  getTimeOff = () => {};
  setTimeOff = () => {};

  setSocket = (socket) => {
    this.socket = socket;
    return socket;
  };

  manageLight = () => {};

  // Private
  _sendMsg = (msg, val) => {
    this.socket.emit(msg, val);
    return this;
  };

  _switchLightOn = () => {
    const lightState = appUtil.getStateFromDatabase('light');

    if (lightState === 1) return;
    appUtil.writeToDatabase(1, 'light');
    this._sendMsg('lightSet', 1);
    console.log('Light switched on by automation');
  };

  _switchLightOff = () => {
    const lightState = appUtil.getStateFromDatabase('light');

    if (lightState === 0) return;
    appUtil.writeToDatabase(0, 'light');
    this._sendMsg('lightSet', 0);
    console.log('Light switched on by automation');
  };
}

const lightAutomation = new Lights();
module.exports = lightAutomation;
