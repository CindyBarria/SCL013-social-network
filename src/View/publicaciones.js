import {
  subirImagen, agregarPublicacion, leerDatos, cerrar,
} from '../lib/controlador-firebase.js';

export const publicar = () => {
  const viewPublicar = `<img id="banner" src='../img/banner.png'/>
<div id='botonesMuro'>
<button class='botonPublicaciones'>Mi Perfil</button>
<button class='botonPublicaciones'>Publicaciones</button>
<button id ='cerrar' class='cerrar'>Cerrar sesion</button>
</div>
<p class="textoMuro">Crear Publicacion
<textarea id='texto' placeholder='¿Que quieres compartir?'></textarea>
</p>
<div class='boton'>
<button id='publicar'>publicar</button>
<button id='cargar'>Cargar Imagen</button>
<input type='file'id='imagen'>
</div>
<div id='post'>
<h2 id='nombreUsuario'>Cindy</h2>
<p id='textoPublicado'>hola cindy</p>
<img id='photo' />
<div class='boton'>
<button class='eliminar'>Eliminar</button>
</div>
</div>

`;
  const divPublicar = document.createElement('div');
  divPublicar.setAttribute('id', 'muro');
  divPublicar.innerHTML = viewPublicar;
  document.getElementById('contenedor').appendChild(divPublicar);
  const cargarImagen = divPublicar.querySelector('#cargar');
  cargarImagen.addEventListener('click', subirImagen);
  leerDatos();
  const muro = document.querySelector('#publicar');
  muro.addEventListener('click', () => {
    agregarPublicacion();
    document.querySelector('#post').innerHTML = '';
  });
  const cerrarSesion = document.querySelector('#cerrar');
  cerrarSesion.addEventListener('click', () => {
    cerrar();
    document.getElementById('contenedor').innerHTML = '';
  });
  return divPublicar;
};
