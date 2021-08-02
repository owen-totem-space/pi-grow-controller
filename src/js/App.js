import { io } from 'socket.io-client';

export default class App {
  constructor() {
    this.socket = io();
    this.addEventListeners();
    this.initApp();
  }
  btns = {
    light: {
      element: document.getElementById('light-toggle-js'),
      msg: 'lightSwitch',
    },
    fan: {
      element: document.getElementById('fan-toggle-js'),
      msg: 'fanSwitch',
    },
    heater: {
      element: document.getElementById('heat-toggle-js'),
      msg: 'heatSwitch',
    },
    humidifier: {
      element: document.getElementById('humid-toggle-js'),
      msg: 'humidSwitch',
    },
    dehumidifier: {
      element: document.getElementById('dehumid-toggle-js'),
      msg: 'dehumidSwitch',
    },
    tempAuto: {
      element: document.getElementById('temp-auto-js'),
      msg: 'tempAutoSwitch',
      panel: document.querySelector('.temp-config'),
      ctrlLabels: [document.querySelector('.show-state-js.heat'), document.querySelector('.show-auto-js.fan')],
    },
    humidityAuto: {
      element: document.getElementById('humidity-auto-js'),
      msg: 'humidityAutoSwitch',
      panel: document.querySelector('.humid-config'),
      ctrlLabels: [document.querySelector('.show-state-js.dehumidifier'), document.querySelector('.show-state-js.humidifier')],
    },
  };

  radios = {
    lightTime: {
      btns: {
        alwaysOn: document.getElementById('light-24hr'),
        timer: document.getElementById('light-on-timer'),
        manual: document.getElementById('light-manual'),
      },
      msg: 'lightTimeSwitch',
      panel: document.querySelector('.light-timer'),
      ctrlLabels: [document.querySelector('.show-state-js.light')],
      ctrlToggle: document.getElementById('light-switch-js'),
    },
    fanTime: {
      btns: {
        alwaysOn: document.getElementById('fan-24hr'),
        timer: document.getElementById('fan-on-timer'),
        manual: document.getElementById('fan-manual'),
      },
      msg: 'fanTimeSwitch',
      panel: document.querySelector('.fan-timer'),
      ctrlLabels: [document.querySelector('.show-state-js.fan')],
      ctrlToggle: document.getElementById('fan-switch-js'),
    },
  };

  toggleSwitchBtn = (newValue, btnObj) => {
    if (newValue === 0) {
      btnObj.element.dataset.toggle = 'off';
      btnObj.element.checked = false;
      // console.log(el.id + ' UI switched on');
    }
    if (newValue === 1) {
      btnObj.element.dataset.toggle = 'on';
      btnObj.element.checked = true;
      // console.log(el.id + ' UI switched off');
    }
  };

  toggleAutoBtn = (newValue, btnObj) => {
    if (newValue === 0) {
      btnObj.element.checked = false;
      btnObj.element.dataset.toggle = 'off';
      btnObj.panel.dataset.collapsed = true;
      btnObj.ctrlLabels.forEach((label) => (label.innerHTML = 'Man'));
      btnObj.element.previousElementSibling.innerHTML = 'Off';
    }
    if (newValue === 1) {
      btnObj.element.checked = true;
      btnObj.element.dataset.toggle = 'on';
      btnObj.panel.dataset.collapsed = false;
      btnObj.ctrlLabels.forEach((label) => (label.innerHTML = 'Auto'));
      btnObj.element.previousElementSibling.innerHTML = 'On';
    }
  };

  toggleTimerBtn = (newValue, btnObj) => {
    if (newValue === 'timer') {
      btnObj.btns.timer.checked = true;
      btnObj.panel.dataset.collapsed = false;
      btnObj.ctrlLabels.forEach((label) => (label.innerHTML = 'Timer'));
      btnObj.ctrlToggle.style.pointerEvents = 'none';
      btnObj.ctrlToggle.style.opacity = '0.5';
    }
    if (newValue === 'alwaysOn') {
      btnObj.btns.alwaysOn.checked = true;
      btnObj.panel.dataset.collapsed = true;
      btnObj.ctrlLabels.forEach((label) => (label.innerHTML = '24 Hr'));
      btnObj.ctrlToggle.style.pointerEvents = 'none';
      btnObj.ctrlToggle.style.opacity = '0.5';
    }
    if (newValue === 'manual') {
      btnObj.btns.manual.checked = true;
      btnObj.panel.dataset.collapsed = true;
      btnObj.ctrlLabels.forEach((label) => (label.innerHTML = 'Man'));
      btnObj.ctrlToggle.removeAttribute('style');
    }
  };

  addEventListeners = () => {
    Object.values(this.btns).forEach((obj) => {
      obj.element.addEventListener('change', () => {
        this.emitBtnEvent(obj.element, obj.msg);
      });
    });

    Object.values(this.radios).forEach((obj) => {
      Object.values(obj.btns).forEach((btn) => {
        btn.addEventListener('change', (e) => {
          this.emitRadioEvent(obj.btns, obj.msg);
        });
      });
    });
  };

  emitBtnEvent = (element, msg) => {
    const socket = this.socket;

    if (element.checked) socket.emit(msg, 1);
    if (!element.checked) socket.emit(msg, 0);
  };

  emitRadioEvent = (btns, msg) => {
    const socket = this.socket;

    if (btns.alwaysOn.checked) socket.emit(msg, 'alwaysOn');
    if (btns.timer.checked) socket.emit(msg, 'timer');
    if (btns.manual.checked) socket.emit(msg, 'manual');
  };

  initApp = () => {
    // socket.io connection
    const socket = this.socket;
    // listen for events
    socket.on('lightSet', (newValue) => {
      this.toggleSwitchBtn(newValue, this.btns.light);
    });
    socket.on('fanSet', (newValue) => {
      this.toggleSwitchBtn(newValue, this.btns.fan);
    });
    socket.on('heatSet', (newValue) => {
      this.toggleSwitchBtn(newValue, this.btns.heater);
    });
    socket.on('humidSet', (newValue) => {
      this.toggleSwitchBtn(newValue, this.btns.humidifier);
    });
    socket.on('dehumidSet', (newValue) => {
      this.toggleSwitchBtn(newValue, this.btns.dehumidifier);
    });
    socket.on('lightTimeSet', (newValue) => {
      this.toggleTimerBtn(newValue, this.radios.lightTime);
    });
    socket.on('fanTimeSet', (newValue) => {
      this.toggleTimerBtn(newValue, this.radios.fanTime);
    });
    socket.on('tempAutoSet', (newValue) => {
      this.toggleAutoBtn(newValue, this.btns.tempAuto);
    });
    socket.on('humidityAutoSet', (newValue) => {
      this.toggleAutoBtn(newValue, this.btns.humidityAuto);
    });
  };
}
