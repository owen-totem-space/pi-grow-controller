import { fetchState } from './fetchSettings.js';

class Dropdown {
  constructor(obj) {
    this.obj = obj;
  }

  hideTransition(el) {
    let elHeight = el.scrollHeight;
    let elTransition = el.style.transition;
    el.style.transition = '';

    requestAnimationFrame(function () {
      el.style.height = elHeight + 'px';
      el.style.transition = elTransition;

      requestAnimationFrame(function () {
        el.style.height = 0 + 'px';
      });
    });
    el.dataset.collapsed = true;
  }

  showTransition(el) {
    let elHeight = el.scrollHeight;
    el.style.height = elHeight + 'px';

    el.addEventListener('transitionend', callback);

    function callback() {
      el.removeEventListener('transitionend', callback);
      el.style.height = null;
      console.log('fired');
    }
    el.dataset.collapsed = false;
  }

  addEventListeners = () => {
    Object.values(this.obj.btns).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.setPanel();
      });
    });
  };
}

class DropdownRadio extends Dropdown {
  constructor(obj) {
    super(obj);

    this.run();
    this.addEventListeners();
  }

  async run() {
    await fetchState('/getState');
    this.setPanel();
  }

  async setPanel() {
    await fetchState('/getState');
    if (this.obj.btns.timer.checked) {
      // this.showTransition(this.obj.panel);
      this.obj.panel.dataset.collapsed = false;
      this.changeStateLabel(this.obj.btns.timer, this.obj);
      this.disableToggle(this.obj);
    }
    if (this.obj.btns.alwaysOn.checked) {
      // this.hideTransition(this.obj.panel);
      this.obj.panel.dataset.collapsed = true;
      this.changeStateLabel(this.obj.btns.alwaysOn, this.obj);
      this.disableToggle(this.obj);
    }
    if (this.obj.btns.manual.checked) {
      // this.hideTransition(this.obj.panel);
      this.obj.panel.dataset.collapsed = true;
      this.changeStateLabel(this.obj.btns.manual, this.obj);
      this.enableToggle(this.obj);
    }
  }

  changeStateLabel(el, obj) {
    const ctrlLabels = obj.ctrlLabels;

    const radioBtns = Object.values(obj.btns);
    const labels = ['24 Hr', 'Timer', 'Man'];

    for (let i = 0; i < radioBtns.length; i++) {
      if (radioBtns[i] === el) {
        ctrlLabels.forEach((label) => (label.innerHTML = labels[i]));
      }
    }
  }

  disableToggle(obj) {
    const toggle = obj.ctrlToggle;
    toggle.style.pointerEvents = 'none';
    toggle.style.opacity = '0.5';
  }

  enableToggle(obj) {
    const toggle = obj.ctrlToggle;
    toggle.removeAttribute('style');
  }
}

class DropdownBtn extends Dropdown {
  constructor(obj) {
    super(obj);

    this.run();
    this.addEventListeners();
  }
  async run() {
    await fetchState('/getState');
    this.setPanel();
  }

  async setPanel() {
    const el = this.obj.btns.toggle;
    await fetchState('/getState');
    if (el.checked) {
      // this.showTransition(this.obj.panel);
      this.obj.panel.dataset.collapsed = false;
      this.changeStateLabel(el, this.obj);
      el.previousElementSibling.innerHTML = 'On';
    } else if (!el.checked) {
      // this.hideTransition(this.obj.panel);
      this.obj.panel.dataset.collapsed = true;
      this.changeStateLabel(el, this.obj);
      el.previousElementSibling.innerHTML = 'Off';
    }
  }

  changeStateLabel(el, obj) {
    const ctrlLabels = obj.ctrlLabels;

    if (el.dataset.toggle === 'on') {
      ctrlLabels.forEach((label) => (label.innerHTML = 'Auto'));
    } else if (el.dataset.toggle === 'off') {
      ctrlLabels.forEach((label) => (label.innerHTML = 'Man'));
    }
  }
}

const light = {
  btns: {
    alwaysOn: document.getElementById('light-24hr'),
    timer: document.getElementById('light-on-timer'),
    manual: document.getElementById('light-manual'),
  },
  panel: document.querySelector('.light-timer'),
  ctrlLabels: [document.querySelector('.show-state-js.light')],
  ctrlToggle: document.getElementById('light-switch-js'),
};

const fan = {
  btns: {
    alwaysOn: document.getElementById('fan-24hr'),
    timer: document.getElementById('fan-on-timer'),
    manual: document.getElementById('fan-manual'),
  },
  panel: document.querySelector('.fan-timer'),
  ctrlLabels: [document.querySelector('.show-state-js.fan')],
  ctrlToggle: document.getElementById('fan-switch-js'),
};

const temp = {
  btns: {
    toggle: document.getElementById('temp-auto-js'),
  },
  panel: document.querySelector('.temp-config'),
  ctrlLabels: [document.querySelector('.show-state-js.heat'), document.querySelector('.show-auto-js.fan')],
  ctrlToggle: 0,
};
const humidity = {
  btns: {
    toggle: document.getElementById('humidity-auto-js'),
  },
  panel: document.querySelector('.humid-config'),
  ctrlLabels: [document.querySelector('.show-state-js.dehumidifier'), document.querySelector('.show-state-js.humidifier')],
  ctrlToggle: 0,
};

export function initDropdowns() {
  new DropdownRadio(light);
  new DropdownRadio(fan);
  new DropdownBtn(temp);
  new DropdownBtn(humidity);
}
