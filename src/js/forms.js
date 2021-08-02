import { fetchSettings } from './fetchSettings.js';
export { initForms };

function settingsForm(e, formEl, url) {
  e.preventDefault();

  const formData = new FormData(formEl);
  const searchParams = new URLSearchParams();

  for (const pair of formData) {
    searchParams.append(pair[0], pair[1]);
  }

  fetch(url, {
    method: 'post',
    body: searchParams,
  })
    .then((res) => {
      return res.text();
    })
    // .then((data) => console.log(data))
    .catch((err) => console.log(err));

  // Call getSettings() to update UI with new data
  fetchSettings('/getState');
}

/**
 * Submit forms with fetch
 */
const lightForm = document.getElementById('light-settings');
const fanForm = document.getElementById('fan-settings');
const tempForm = document.getElementById('temperature-settings');
const humidityForm = document.getElementById('humidity-settings');

function initForms() {
  lightForm.addEventListener('submit', (e) => settingsForm(e, lightForm, '/light-settings'));
  fanForm.addEventListener('submit', (e) => settingsForm(e, fanForm, '/fan-settings'));
  tempForm.addEventListener('submit', (e) => settingsForm(e, tempForm, '/temp-settings'));
  humidityForm.addEventListener('submit', (e) => settingsForm(e, humidityForm, '/humidity-settings'));
}
