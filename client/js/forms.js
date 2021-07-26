import { getSettings } from './fetchSettings.js';
export { settingsForm };

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

  getSettings('/getState');
}
