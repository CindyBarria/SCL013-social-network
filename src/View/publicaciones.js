import {
  subirImagen, agregarPublicacion, leerDatos, cerrar, usuario
} from '../lib/controlador-firebase.js';
import {perfil} from './perfil.js'
export const publicar = () => {
  window.location.hash = '#/muro';
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
<img id='guardarFoto'/>
</p>
<div class='boton'>
<button id='publicar'>publicar</button>
<button id='editar'>guardar cambios</button>
<input type='file'id='imagen'/>
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

  //para previualizar foto en un conteedor 
  const subirFoto = document.querySelector('#imagen');
  subirFoto.addEventListener('change',()=> {
   const contenedorImagen = document.getElementById('guardarFoto');
   const inputImg = document.getElementById('imagen');
   const reader = new FileReader();
    reader.onload = (e) => {
      contenedorImagen.setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(inputImg.files[0]);
  });
  //accion de boton publicar
  const botonPublicar = document.getElementById('publicar');
  botonPublicar.addEventListener('click', () => {
    const info = document.getElementById('imagen').files;
    if (info.length > 0) {
      const urlImg = subirImagen(info[0], 'imgPublicacion');
      urlImg.then((url) => {
      agregarPublicacion(url);
      });
    } else {
      agregarPublicacion(null);
    }
  });
   leerDatos();
  // cerrar sesion
  const cerrarSesion = document.querySelector('#cerrar');
  cerrarSesion.addEventListener('click', () => {
    cerrar();
    document.getElementById('contenedor').innerHTML = '';
  });
  //perfil
  const botonPerfil=document.querySelector('#miPerfil');
  botonPerfil.addEventListener('click' , ()=>{
   perfil()
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
