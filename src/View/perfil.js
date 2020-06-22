import {publicar} from './publicaciones.js'
import { leerDatos,usuario, cerrar } from '../lib/controlador-firebase.js'
export const perfil = () => {
    window.location.hash = '#/perfil';
    const user = usuario();
    const viewPerfil = `<img id='banner' src='../img/banner.png'/>
  <header>
  <input type='checkBox' id='btn-menu'>
  <label for='btn-menu'><img class='menu-barras' src='../img/bars-solid.png'></label>
  <nav class='menu'>
  <div id='botonesMuro'>
  <button id ='miPerfil' class='botonPublicaciones'><i id= 'perfilIcono'class="fas fa-user-alt"></i></button>
  <button id='home' class='botonPublicaciones'><i id= 'homeIcono'class="fas fa-home"></i></button>
  <button id ='cerrar' class='cerrar'> Cerrar sesión <i id = 'cerrarSesion'class="fas fa-sign-out-alt"></i></button>
  </div>
  </nav>
  </header>
  <div id='perfilUsuario'>
  <p id="bienvenida">Bienvenida ${user.displayName}</p>
  <img class='photoPerfil' src="${user.photoURL}">
  </div>
  <div id = 'historyApi'>
  <button id="atras" class="fas fa-chevron-circle-left">Anterior</button>
  <button id="adelante" class="fas fa-chevron-circle-right">Siguiente</button>
  </div>`;
  
    const divPerfil = document.createElement('div');
    divPerfil.setAttribute('class', 'contenedorPerfil');
    divPerfil.innerHTML = viewPerfil;

    document.getElementById('contenedor').appendChild(divPerfil);

    const botonPublicacion=document.querySelector('#home');
    botonPublicacion.addEventListener('click' , ()=>{
    document.getElementById('contenedor').innerHTML = '';
     publicar()
  })
    leerDatos();
    const cerrarSesion = document.querySelector('#cerrar');
    cerrarSesion.addEventListener('click', () => {
    cerrar();
    document.getElementById('contenedor').innerHTML = '';
  });
    const botonPerfil=document.querySelector('#miPerfil');
    botonPerfil.addEventListener('click' , ()=>{
    perfil()
  });
  // Funciones que hacen el history Api atrás y adelante
  const atras = divPerfil.querySelector('#atras');
  atras.addEventListener('click', () => {
    window.history.go(-1);
  });
  const adelante = divPerfil.querySelector('#adelante');
  adelante.addEventListener('click', () => {
    window.history.go(1);
  });
return divPerfil;
}