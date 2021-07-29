import { initForms } from './forms.js';
import { fetchSettings } from './fetchSettings.js';
import { setBackgroundImg } from './design.js';
import { headerTime } from './time.js';
import { initDropdowns } from './dropdownPanels.js';
import { run } from './charts.js';
import { io } from 'socket.io-client';

(function () {
  const socket = io();

  // setBackgroundImg();
  headerTime();
  // run fetchSettings before initDropdowns to set state
  fetchSettings('/getState');
  initDropdowns();
  initForms();
  // changeStateLabel();

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

  const tempAutoSwitch = document.getElementById('temp-auto-js');
  tempAutoSwitch.addEventListener('change', () => automationMsg(tempAutoSwitch, 'tempAutoSwitch'));

  const humidAutoSwitch = document.getElementById('humidity-auto-js');
  humidAutoSwitch.addEventListener('change', () => automationMsg(humidAutoSwitch, 'humidityAutoSwitch'));

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
  socket.on('tempAutoSet', (newValue) => {
    flipAutoSwitch(newValue, tempAutoSwitch);
  });
  socket.on('humidityAutoSet', (newValue) => {
    flipAutoSwitch(newValue, humidAutoSwitch);
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
  function automationMsg(el, msg) {
    if (el.checked) {
      socket.emit(msg, 'automationOn');
    }
    if (!el.checked) {
      socket.emit(msg, 'automationOff');
    }
  }

  function switchOn(el) {
    el.dataset.toggle = 'on';
    el.checked = true;
    // console.log(el.id + ' UI switched on');
  }

  function switchOff(el) {
    el.dataset.toggle = 'off';
    el.checked = false;
    // console.log(el.id + ' UI switched off');
  }

  function flipSwitch(newValue, el) {
    if (newValue === 0) switchOff(el);
    if (newValue === 1) switchOn(el);
  }

  function flipAutoSwitch(newValue, el) {
    if (newValue === 'automationOff') {
      switchOff(el);
    }
    if (newValue === 'automationOn') {
      switchOn(el);
    }
  }
})();
