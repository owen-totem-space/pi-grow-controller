// import { gpioStartup, runGPIO } from './gpio.js';

// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// dayjs.extend(customParseFormat);
import { settingsForm } from './forms.js';

(function () {
  // Load socket.io
  const socket = io();
  // gpioStartup();
  // runGPIO(socket);

  /**
   * Submit forms with fetch
   */
  const lightForm = document.getElementById('light-settings');
  lightForm.addEventListener('submit', (e) => settingsForm(e, lightForm, '/light-settings'));

  const fanForm = document.getElementById('fan-settings');
  fanForm.addEventListener('submit', (e) => settingsForm(e, fanForm, '/fan-settings'));

  const tempForm = document.getElementById('temperature-settings');
  tempForm.addEventListener('submit', (e) => settingsForm(e, tempForm, '/temp-settings'));

  const humidityForm = document.getElementById('humidity-settings');
  humidityForm.addEventListener('submit', (e) => settingsForm(e, humidityForm, '/humidity-settings'));

  /**
   * Add Event Listeners on buttons
   * Send messages to server about state
   */
  const lightSwitch = document.getElementById('light-toggle-js');
  lightSwitch.addEventListener('change', () => eventMsg(lightSwitch, 'lightSwitch'));

  const heatSwitch = document.getElementById('heat-toggle-js');
  heatSwitch.addEventListener('change', () => eventMsg(heatSwitch, 'heatSwitch'));

  const fanSwitch = document.getElementById('fan-toggle-js');
  fanSwitch.addEventListener('change', () => eventMsg(fanSwitch, 'fanSwitch'));

  const humidSwitch = document.getElementById('humid-toggle-js');
  humidSwitch.addEventListener('change', () => eventMsg(humidSwitch, 'humidSwitch'));

  const dehumidSwitch = document.getElementById('dehumid-toggle-js');
  dehumidSwitch.addEventListener('change', () => eventMsg(dehumidSwitch, 'dehumidSwitch'));

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
   * Functions
   */
  function eventMsg(el, msg) {
    if (el.checked) {
      socket.emit(msg, 1);
    }
    if (!el.checked) {
      socket.emit(msg, 0);
    }
  }

  function switchOn(el) {
    el.dataset.toggle = 'on';
    el.checked = true;
    console.log(el.id + ' UI switched on');
  }
  function switchOff(el) {
    el.dataset.toggle = 'off';
    el.checked = false;
    console.log(el.id + ' UI switched off');
  }
  function flipSwitch(newValue, el) {
    if (newValue === 0) switchOff(el);
    if (newValue === 1) switchOn(el);
  }
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
