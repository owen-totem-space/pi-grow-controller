import { initForms } from './forms.js';
import { fetchSettings } from './fetchSettings.js';
import { headerTime } from './time.js';
import { run } from './charts.js';
import App from './App.js';

(function () {
  document.body.style.background = "url('img/pexels-rahul-shah-1546027.jpg')";

  headerTime();
  fetchSettings('/getState');
  const app = new App();
  initForms();
})();
