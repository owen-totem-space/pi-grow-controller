(function () {
  // Load socket.io
  const socket = io();
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
    console.log('Light UI switched');
  });
  socket.on('heatSet', (newValue) => {
    flipSwitch(newValue, heatSwitch);
    console.log('Heat UI switched');
  });
  socket.on('fanSet', (newValue) => {
    flipSwitch(newValue, fanSwitch);
    console.log('Fan UI switched');
  });
  socket.on('humidSet', (newValue) => {
    flipSwitch(newValue, humidSwitch);
    console.log('Humidifier UI switched');
  });
  socket.on('dehumidSet', (newValue) => {
    flipSwitch(newValue, dehumidSwitch);
    console.log('Dehumidifier UI switched');
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
  };
  const switchOff = (el) => {
    el.dataset.toggle = 'off';
    el.checked = false;
  };
  const flipSwitch = (newValue, el) => {
    if (newValue === 0) switchOff(el);
    if (newValue === 1) switchOn(el);
  };
})();
