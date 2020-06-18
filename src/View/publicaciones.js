import {
  subirImagen, agregarPublicacion, leerDatos, cerrar, usuario,
} from '../lib/controlador-firebase.js';

export const publicar = () => {
  const user = usuario();
  const viewPublicar = `<img id='banner' src='../img/banner.png'/>
<div id='botonesMuro'>
<button id ='miPerfil' class='botonPublicaciones'>Mi Perfil</button>
<button class='botonPublicaciones'>Publicaciones</button>
<button id ='cerrar' class='cerrar'>Cerrar sesion</button>
</div>
<div id='perfilUsuario'>
<p id="bienvenida">Bienvenida ${user.displayName}</p>
<img class='photoPerfil' src="${user.photoURL}">
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
<button id="atras" class="fas fa-chevron-circle-left">Anterior</button>
<button id="adelante" class="fas fa-chevron-circle-right">Siguiente</button>
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
  // Funciones que hacen el history Api atrás y adelante
  const atras = divPublicar.querySelector('#atras');
  atras.addEventListener('click', () => {
    window.history.go(-1);
  });
  const adelante = divPublicar.querySelector('#adelante');
  adelante.addEventListener('click', () => {
    window.history.go(1);
  });
  return divPublicar;
};
