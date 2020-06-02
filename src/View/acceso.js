import { acceso, autentificacion } from '../lib/controlador-firebase.js';
export const ingresar = () => {
const viewHome = `
<h1>Inicia Sesion</h1>
<input type="email" id="correo2" placeholder="Correo"/>
<input type="password" id="contraseña2" placeholder="Contraseña"/>
<button id="ingresar">Ingresar</button>`;

const divAcceso = document.createElement('div');
divAcceso.innerHTML = viewHome;
document.getElementById('contenedor').appendChild(divAcceso);
const botonRegistro = document.querySelector('#ingresar');
botonRegistro.addEventListener('click', ()=>{
    let correoDos = document.getElementById('correo2').value;
    let contraseñaDos = document.getElementById('contraseña2').value;
    acceso(correoDos,contraseñaDos);
    autentificacion(correoDos,contraseñaDos);
  });
  return divAcceso;
};



