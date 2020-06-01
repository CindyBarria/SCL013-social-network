import { cambioVista } from './view-controller/index2.js';
const init = () => {
  cambioVista(window.location.hash);
  window.addEventListener ('hashchange', () => cambioVista(window.location.hash));
};

window.addEventListener('load', init);