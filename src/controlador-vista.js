import { ingresar } from './View/acceso.js';
import { registrar } from './View/registro.js';
import { menu } from './View/menu.js';

const cambioVista = (hash) => {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = menu();
  switch (hash) {
    case '#/menu':
      contenedor.appendChild(menu());
      break;
    case '#/':
      contenedor.appendChild(ingresar());
      break;
    case '#/registro':
      contenedor.appendChild(registrar());
      break;
    default:
  }
};

export const cambioRuta = ((hash) => {
  if (hash === '#/') {
    return cambioVista(hash);
  } if (hash === '#/registro') {
    return cambioVista(hash);
  } return cambioVista(hash);
});
