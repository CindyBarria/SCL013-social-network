import {
  subirImagen, agregarPublicacion, leerDatos, cerrar,
} from '../lib/controlador-firebase.js';

export const publicar = () => {
  window.location.hash = '#/muro';
  const viewPublicar = `<img id='banner' src='../img/banner.png'/>
<div id='botonesMuro'>
<button id ='miPerfil' class='botonPublicaciones'>Mi Perfil</button>
<button class='botonPublicaciones'>Publicaciones</button>
<button id ='cerrar' class='cerrar'>Cerrar sesion</button>
</div>
<p class='textoMuro'>Crear Publicacion
<textarea id='texto' placeholder='¿Que quieres compartir?'></textarea>
</p>
<div class='boton'>
<button id='publicar'>publicar</button>
<button id='editar'>guardar cambios</button>
<input type='file'id='imagen'>
</div>
<div id='post'>
</div>
`;
  const divPublicar = document.createElement('div');
  divPublicar.setAttribute('id', 'muro');
  divPublicar.innerHTML = viewPublicar;
  document.getElementById('contenedor').appendChild(divPublicar);

  const muro = document.querySelector('#publicar');
  muro.addEventListener('click', () => {
    agregarPublicacion();
    subirImagen();
  });
  leerDatos();
  const cerrarSesion = document.querySelector('#cerrar');
  cerrarSesion.addEventListener('click', () => {
    cerrar();
    document.getElementById('contenedor').innerHTML = '';
  });
  return divPublicar;
};
