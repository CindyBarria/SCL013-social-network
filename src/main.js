import { menu } from './View/menu.js'
import { cambioRuta } from './controlador-vista.js';


const init = () => {
  document.getElementById("contenedor").innerHTML=menu()
  cambioRuta(window.location.hash);
  window.addEventListener ('hashchange', () => {
    cambioRuta(window.location.hash);
  })
  
};

window.addEventListener('load', init);