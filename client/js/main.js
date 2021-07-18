/**
 * Display Connection Status to server
 *
 * Get Sensor data
 * Brodacast sensor data
 *
 * Gauges
 * Get sensor broadcast -> update gauge
 *
 * Switches
 * Broadcast switch state/change
 * Display last time on and off
 *
 */

/**
 * Settings to run
 *
 * allow user to set predefined settings
 *
 */

(function () {
  // Load socket.io
  const socket = io();
  const lightSwitch = document.getElementById('light-toggle-js');
  const heatSwitch = document.getElementById('heat-toggle-js');
  const fanSwitch = document.getElementById('fan-toggle-js');
  const humidSwitch = document.getElementById('humid-toggle-js');
  const dehumidSwitch = document.getElementById('dehumid-toggle-js');

  socket.on('lightSet', (data) => {
    if (data === 0) {
      lightSwitch.dataset.toggle = 'off';
      lightSwitch.checked = false;
    } else if (data === 1) {
      lightSwitch.dataset.toggle = 'on';
      lightSwitch.checked = true;
    }
  });

  lightSwitch.addEventListener('change', () => {
    if (lightSwitch.checked) {
      socket.emit('lightSwitch', 1);
    } else {
      socket.emit('lightSwitch', 0);
    }
  });

  socket.on('heatSet', (data) => {
    if (data === 0) {
      heatSwitch.dataset.toggle = 'off';
      heatSwitch.checked = false;
    } else if (data === 1) {
      heatSwitch.dataset.toggle = 'on';
      heatSwitch.checked = true;
    }
  });

  heatSwitch.addEventListener('change', () => {
    if (heatSwitch.checked) {
      socket.emit('heatSwitch', 1);
    } else {
      socket.emit('heatSwitch', 0);
    }
  });

  socket.on('fanSet', (data) => {
    if (data === 0) {
      fanSwitch.dataset.toggle = 'off';
      fanSwitch.checked = false;
    } else if (data === 1) {
      fanSwitch.dataset.toggle = 'on';
      fanSwitch.checked = true;
    }
  });

  fanSwitch.addEventListener('change', () => {
    if (fanSwitch.checked) {
      socket.emit('fanSwitch', 1);
    } else {
      socket.emit('fanSwitch', 0);
    }
  });

  socket.on('humidSet', (data) => {
    if (data === 0) {
      humidSwitch.dataset.toggle = 'off';
      humidSwitch.checked = false;
    } else if (data === 1) {
      humidSwitch.dataset.toggle = 'on';
      humidSwitch.checked = true;
    }
  });

  humidSwitch.addEventListener('change', () => {
    if (humidSwitch.checked) {
      socket.emit('humidSwitch', 1);
    } else {
      socket.emit('humidSwitch', 0);
    }
  });

  socket.on('dehumidSet', (data) => {
    if (data === 0) {
      dehumidSwitch.dataset.toggle = 'off';
      dehumidSwitch.checked = false;
    } else if (data === 1) {
      dehumidSwitch.dataset.toggle = 'on';
      dehumidSwitch.checked = true;
    }
  });

  dehumidSwitch.addEventListener('change', () => {
    if (dehumidSwitch.checked) {
      socket.emit('dehumidSwitch', 1);
    } else {
      socket.emit('dehumidSwitch', 0);
    }
  });
})();
