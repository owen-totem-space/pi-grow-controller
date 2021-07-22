import switches from '../../server/Switches.js';
// Timer for lights.
// time inputs for on and off.
// button for 24hrs
class Lights {
  constructor() {
    this.on = switches.getLightState();
    this.timeOn = true;
    this.timeOff = false;
    this.inputOn = document.getElementById('');
    this.inputOff = document.getElementById('');
  }
  // Public
  getTimeOn = () => {};
  setTimeOn = () => {};
  getTimeOff = () => {};
  setTimeOff = () => {};

  // Private
}

// If temperature gets too hot, turn on fan.
// If temperature gets too low, turn on heater.
class Temp {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.temp = 25;
    this.highTemp = 27;
    this.lowTemp = 24;
    // update temperature value every minute
    this._listenToTemp();
    this._manageTemp();
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
    return this;
  };
  getTemp = () => {
    return this.temp;
  };

  // Private
  _listenToTemp = () => {
    // function to get temperature value from sensor and update this.temp
    setInterval(this._listenToTemp, 60000);
  };

  _medianTemp = () => {
    const medianTemp = this.highTemp - this.lowTemp + this.lowTemp;
    console.log(medianTemp);
    return medianTemp;
  };

  _tempTooLow = () => {
    const temp = this.getTemp();
    if (temp <= this.getLowTemp()) {
      if (switches.getHeaterState() === 1) return; // heater already on
      switches.setHeaterState(1);
      this.io.emit('heatSet', switches.getHeaterState());
      return;
    }
    if (temp >= this._medianTemp()) {
      if (switches.getHeaterState() === 0) return;
      switches.setHeaterState(0);
      this.io.emit('heatSet', switches.getHeaterState());
      return;
    }
  };
  _tempTooHigh = () => {
    const temp = this.getTemp();
    if (temp >= this.getHighTemp()) {
      if (switches.getHeaterState() === 0 && switches.getFanState() === 1) {
        // heat is already off, fan is on. nothing to do here, exit.
        return;
      }
      if (switches.getHeaterState() === 1) {
        switches.setHeaterState(0);
        this.io.emit('heatSet', switches.getHeaterState());
      }
      switches.setFanState(1);
      this.io.emit('fanSet', switches.getFanState());
    }
    if (temp <= this._medianTemp()) {
      // what to do? fan could be on.
    }
  };

  _manageTemp = () => {
    const temp = getTemp();
    const lowTemp = this.getLowTemp();
    const highTemp = this.getHighTemp();
    if (temp <= lowTemp) this._tempTooLow();
    if (temp >= highTemp) this._tempTooHigh();

    setInterval(this._manageTemp(), 60000);
  };
}

// If humidity gets high, turn on fan or dehumidifier or both.
// If humidity gets low, turn on humidifier.
// TODO: add option to turn on/off auto manage humidity. wrap _manageHumdity in constructor with if statement
class Humidity {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.humidity = 65;
    this.highHumid = 70;
    this.lowHumid = 60;
    // update humidity value every minute
    this._listenToHumidity();
    this._manageHumidity();
  }
  // Public
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

  // Private
  _listenToHumidity = () => {
    // function to get humidity value from sensor and update this.humidity
    setInterval(this._listenToHumidity, 60000);
  };

  _medianHumidity = () => {
    const diff = this.highHumid - this.lowHumid;
    const medianHumidity = diff + this.lowHumid;
    console.log(medianHumidity);
    return medianHumidity;
  };

  _humidityTooLow = () => {
    const humidity = this.getHumidity();
    if (humidity <= this.getLowHumidity()) {
      // turn on humidifier switch
      if (switches.getHumidState() === 1) return; // humidifier already on
      switches.setHumidState(1);
      this.io.emit('humidSet', switches.getHumidState());
      return;
    }
    if (humidity >= this._medianHumidity()) {
      // turn off humidifier switch
      if (switches.getHumidState() === 0) return; // humidifier already off
      switches.setHumidState(0);
      this.io.emit('humidSet', switches.getHumidState());
      return;
    }
  };

  _humidityTooHigh = () => {
    const humidity = this.getHumidity();
    if (humidity >= this.getHighHumidity()) {
      // turn on switch of whatever option for humidity extraction is selected
      if (switches.getFanState() === 1) return; // fan already on
      switches.setFanState(1);
      this.io.emit('fanSet', switches.getFanState());
      return;
    }
    if (humidity <= this._medianHumidity()) {
      if (switches.getHumidState() === 0) return;
      switches.setFanState(0);
      this.io.emit('fanSet', switches.getFanState());
      return;
    }
  };

  _manageHumidity = () => {
    const humidity = this.getHumidity();
    const lowHumidity = this.getLowHumidity();
    const highHumidity = this.getHighHumidity();
    if (humidity <= lowHumidity) this._humidityTooLow();
    if (humidity >= highHumidity) this._humidityTooHigh();

    setInterval(this._manageHumidity(), 60000);
  };
}

// Emergency turn everything off.
