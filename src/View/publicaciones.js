import {
  subirImagen, agregarPublicacion, leerDatos, cerrar, usuario,
} from '../lib/controlador-firebase.js';

export const publicar = () => {
  const user = usuario();
  const viewPublicar = `<img id='banner' src='../img/banner.png'/>
  <header>
  <input type='checkBox' id='btn-menu'>
  <label for='btn-menu'><img class='menu-barras' src='../img/bars-solid.png'></label>
  <nav class='menu'>
  <div id='botonesMuro'>
<button id ='miPerfil' class='botonPublicaciones'><i id= 'perfilIcono'class="fas fa-user-alt"></i></button>
<button class='botonPublicaciones'><i id= 'homeIcono'class="fas fa-home"></i></button>
<button id ='cerrar' class='cerrar'> Cerrar sesión <i id = 'cerrarSesion'class="fas fa-sign-out-alt"></i></button>
</div>
  </nav>
  </header>
<div id='perfilUsuario'>
<p id="bienvenida">Bienvenida ${user.displayName}</p>
<img class='photoPerfil' src="${user.photoURL}">
</div>
<p class='textoMuro'>Crear Publicación</p>
<textarea id='texto' placeholder='¿Qué quieres compartir?'></textarea>
</p>
<div class='boton'>
<button id='publicar'>publicar</button>
<button id='editar'>guardar cambios</button>
<input type='file'id='imagen'>
</div>
<div id='post'>
</div>
<div id = 'historyApi'>
<button id="atras" class="fas fa-chevron-circle-left">Anterior</button>
<button id="adelante" class="fas fa-chevron-circle-right">Siguiente</button>
</div>`;
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
