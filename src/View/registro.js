import { registro } from '../lib/controlador-firebase.js';
export const registrar = () => {
const viewLogIn = `
  <h1>Registrate</h1>
  <input type="text" id="nombre" placeholder="Escribe tu nombre"/>
  <input type="email" id="email" placeholder="Correo"/>
  <input type="password" id="password" placeholder="Contraseña"/>
  <button id="registrarse">Registrarse</button>`;

const divELement = document.createElement('div');
divELement.innerHTML = viewLogIn;
document.getElementById('contenedor').appendChild(divELement);
const botonRegistro = document.querySelector('#registrarse');
botonRegistro.addEventListener('click', ()=>{
  //const enviar = () => {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;
    registro(correo,contraseña);
  });
  return divELement;







/*const boton = document.getElementById('registrarse');
boton.addEventListener('click',enviar);*/


};
