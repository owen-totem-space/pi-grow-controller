export { fetchSettings };

function fetchSettings(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      document.getElementById('light-time-on-js').innerHTML = json.lightOn;
      document.getElementById('light-time-off-js').innerHTML = json.lightOff;
      document.getElementById('fan-time-on-js').innerHTML = json.fanOn;
      document.getElementById('fan-time-off-js').innerHTML = json.fanOff;
      document.getElementById('temp-high-js').innerHTML = json.tempHigh;
      document.getElementById('temp-low-js').innerHTML = json.tempLow;
      document.getElementById('humidity-high-js').innerHTML = json.humidityHigh;
      document.getElementById('humidity-low-js').innerHTML = json.humidityLow;

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
