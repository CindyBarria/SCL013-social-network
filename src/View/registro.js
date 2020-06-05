import { registro } from '../lib/controlador-firebase.js';

export const registrar = () => {
  const viewLogIn = `
<img class="fondo" src="../img/fondo.jpg" />
<img class="logo" src="../img/logo.png" />
<div class="portada">
  <h1>¡Regístrate!</h1>
  <input type="text" id="nombre" placeholder="Escribe tu nombre"/>
  <span class="fas fa-user"></span>
  <input type="email" id="email" placeholder="Correo"/>
  <span class="fas fa-envelope" ></span>
  <input type="password" id="password" placeholder="Contraseña"/>
  <span class="fas fa-key"></span>
  <button id="registrarse" class="botones">Regístrarse</button>
  <a href="#/">Acceso</a>
  </>`;

  const divELement = document.createElement('div');
  divELement.setAttribute('class', 'contenedorVista');
  divELement.innerHTML = viewLogIn;
  document.getElementById('contenedor').appendChild(divELement);
  const botonRegistro = document.querySelector('#registrarse');
  botonRegistro.addEventListener('click', () => {
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;
    registro(correo, contraseña);
  });
  return divELement;
};
