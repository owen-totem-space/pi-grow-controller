import { Gpio } from 'onoff';
import { switches } from '../../server/Switches.mjs';

const light = new Gpio(26, 'out');
const heat = new Gpio(27, 'out');
const fan = new Gpio(28, 'out');
const humid = new Gpio(25, 'out');
const dehumid = new Gpio(20, 'out');
// const tempSensor = new Gpio(15, 'out');
// const humidSensor = new Gpio(16, 'out');

const runGPIO = () => {
  const socket = io();
  console.log('started running');

  /**
   * Manage messages from socket.io server
   */
  socket.on('lightSet', (newValue) => {
    light.writeSync(switches.getLightState());
    console.log('Light GPIO Switched');
  });
  socket.on('heatSet', (newValue) => {
    heat.writeSync(switches.getHeaterState());
    console.log('Heat GPIO Switched');
  });
  socket.on('fanSet', (newValue) => {
    fan.writeSync(switches.getFanState());
    console.log('Fan GPIO Switched');
  });
  socket.on('humidSet', (newValue) => {
    humid.writeSync(switches.getHumidState());
    console.log('Humidifier GPIO Switched');
  });
  socket.on('dehumidSet', (newValue) => {
    dehumid.writeSync(switches.getDehumidState());
    console.log('Dehumidifier GPIO Switched');
  });

  process.on('SIGINT', () => {
    light.writeSync(0);
    light.unexport();

    heat.writeSync(0);
    heat.unexport();

    fan.writeSync(0);
    fan.unexport();

    humid.writeSync(0);
    humid.unexport();

    dehumid.writeSync(0);
    dehumid.unexport();

    process.exit();
  });
};

const gpioStartup = () => {
  light.writeSync(switches.getLightState());
  heat.writeSync(switches.getHeaterState());
  fan.writeSync(switches.getFanState());
  humid.writeSync(switches.getHumidState());
  dehumid.writeSync(switches.getDehumidState());

  console.log(`Started`);
};

gpioStartup();
runGPIO();
