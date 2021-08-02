export { fetchSettings, fetchState };

function fetchSettings(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      // Current settings div
      document.getElementById('light-time-on-js').innerText = json.lightOn;
      document.getElementById('light-time-off-js').innerText = json.lightOff;
      document.getElementById('fan-time-on-js').innerText = json.fanOn;
      document.getElementById('fan-time-off-js').innerText = json.fanOff;
      document.getElementById('temp-high-js').innerText = json.tempHigh;
      document.getElementById('temp-low-js').innerText = json.tempLow;
      document.getElementById('humidity-high-js').innerText = json.humidityHigh;
      document.getElementById('humidity-low-js').innerText = json.humidityLow;

      // Form Inputs
      document.getElementById('switch-light-on').value = json.lightOn;
      document.getElementById('switch-light-off').value = json.lightOff;
      document.getElementById('switch-fan-on').value = json.fanOn;
      document.getElementById('switch-fan-off').value = json.fanOff;
      document.getElementById('temp-high').value = json.tempHigh;
      document.getElementById('temp-low').value = json.tempLow;
      document.getElementById('humidity-high').value = json.humidityHigh;
      document.getElementById('humidity-low').value = json.humidityLow;
    })
    .catch((err) => console.log(err));
}

function fetchState(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
