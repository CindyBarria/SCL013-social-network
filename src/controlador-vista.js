import { ingresar } from './View/acceso.js';
import { registrar } from './View/registro.js';
import { publicar} from './View/publicaciones.js'


const cambioVista = (hash) => {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML ='';
  switch (hash) {
    case '':
      contenedor.appendChild(ingresar());
      break;
    case '#/':
      contenedor.appendChild(ingresar());
      break;
    case '#/registro':
      contenedor.appendChild(registrar());
      break;
      case '#/muro':
      contenedor.appendChild(publicar());
      break;
    default:
      contenedor.innerHTML = 
      `<img class="error" src="../img/error-404-no-found.jpg" />`
  }
};

export const cambioRuta = ((hash) => {
  if (hash === '#/') {
    return cambioVista(hash);
  } if (hash === '#/registro') {
    return cambioVista(hash);
  } return cambioVista(hash);
});
