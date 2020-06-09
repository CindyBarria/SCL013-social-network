import { subirImagen } from '../lib/controlador-firebase.js';

export const publicar = () => {
  const viewPublicar = `<input type="file"id="imagen">
<button id="cargar">Cargar Imagen</button>
<img id="photo" width="400" height="400"/>
`;
  const divPublicar = document.createElement('div');
  divPublicar.innerHTML = viewPublicar;
  document.getElementById('contenedor').appendChild(divPublicar);
  const cargarImagen = divPublicar.querySelector('#cargar');
  cargarImagen.addEventListener('click', subirImagen);
  return divPublicar;
};
