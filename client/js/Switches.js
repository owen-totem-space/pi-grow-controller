class Switches {
  constructor(lightValue, heaterValue, fanValue, humidValue, dehumidValue) {
    if (Switches.instance == null) {
      this.lightValue = lightValue;
      this.heaterValue = heaterValue;
      this.fanValue = fanValue;
      this.humidValue = humidValue;
      this.dehumidValue = dehumidValue;
      Switches.instance = this;
    }
    return Switches.instance;
  }

  getLightState = () => {
    return this.lightValue;
  };
  setLightState = (value) => {
    this.lightValue = value;
    return this;
  };

  getHeaterState = () => {
    return this.heaterValue;
  };
  setHeaterState = (value) => {
    this.heaterValue = value;
    return this;
  };

  getFanState = () => {
    return this.fanValue;
  };
  setFanState = (value) => {
    this.fanValue = value;
    return this;
  };

  getHumidState = () => {
    return this.humidValue;
  };
  setHumidState = (value) => {
    this.humidValue = value;
    return this;
  };

  getDehumidState = () => {
    return this.dehumidValue;
  };
  setDehumidState = (value) => {
    this.dehumidValue = value;
    return this;
  };
}
const switches = new Switches(1, 0, 0, 0, 0);
module.exports = switches;
