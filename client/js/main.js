// import { gpioStartup, runGPIO } from './gpio.js';

// import tempAutomation from '../../server/classes/Temp-auto.js';

(function () {
  // Load socket.io
  const socket = io();
  // gpioStartup();
  // runGPIO(socket);
  // Store Button Elements
  const lightSwitch = document.getElementById('light-toggle-js');
  const heatSwitch = document.getElementById('heat-toggle-js');
  const fanSwitch = document.getElementById('fan-toggle-js');
  const humidSwitch = document.getElementById('humid-toggle-js');
  const dehumidSwitch = document.getElementById('dehumid-toggle-js');

  /**
   * Manage Messages from socket.io server
   */
  socket.on('lightSet', (newValue) => {
    flipSwitch(newValue, lightSwitch);
  });
  socket.on('heatSet', (newValue) => {
    flipSwitch(newValue, heatSwitch);
  });
  socket.on('fanSet', (newValue) => {
    flipSwitch(newValue, fanSwitch);
  });
  socket.on('humidSet', (newValue) => {
    flipSwitch(newValue, humidSwitch);
  });
  socket.on('dehumidSet', (newValue) => {
    flipSwitch(newValue, dehumidSwitch);
  });

  /**
   * Add Event Listeners on buttons
   * Send messages to server about state
   */
  lightSwitch.addEventListener('change', () => {
    if (lightSwitch.checked) {
      socket.emit('lightSwitch', 1);
    } else {
      socket.emit('lightSwitch', 0);
    }
  });

  heatSwitch.addEventListener('change', () => {
    if (heatSwitch.checked) {
      socket.emit('heatSwitch', 1);
    } else {
      socket.emit('heatSwitch', 0);
    }
  });

  fanSwitch.addEventListener('change', () => {
    if (fanSwitch.checked) {
      socket.emit('fanSwitch', 1);
    } else {
      socket.emit('fanSwitch', 0);
    }
  });

  humidSwitch.addEventListener('change', () => {
    if (humidSwitch.checked) {
      socket.emit('humidSwitch', 1);
    } else {
      socket.emit('humidSwitch', 0);
    }
  });

  dehumidSwitch.addEventListener('change', () => {
    if (dehumidSwitch.checked) {
      socket.emit('dehumidSwitch', 1);
    } else {
      socket.emit('dehumidSwitch', 0);
    }
  });

  /**
   * Functions
   */
  const switchOn = (el) => {
    el.dataset.toggle = 'on';
    el.checked = true;
    console.log(el.id + ' UI switched on');
  };
  const switchOff = (el) => {
    el.dataset.toggle = 'off';
    el.checked = false;
    console.log(el.id + ' UI switched on');
  };
  const flipSwitch = (newValue, el) => {
    if (newValue === 0) switchOff(el);
    if (newValue === 1) switchOn(el);
  };

  /**
   * Automation
   */

  // setInterval(tempAutomation.manageTemp, 5000, socket);
})();

// async _fetchState() {
//   fetch('/getState')
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data.humidifier.value);
//       return data.humidifier.value;
//     });
// }
