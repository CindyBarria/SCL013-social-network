import { acceso, autentificacion, loginGoogle } from '../lib/controlador-firebase.js';
export const ingresar = () => {
const viewHome = `

<img class= "fondo" src="https://i.ibb.co/2yB8pQS/fodito.jpg"/>

<div class="portada">
<h1>Inicia Sesion</h1>
<input type="email" id="correo2" placeholder="Correo"/>
<input type="password" id="contraseña2" placeholder="Contraseña"/>
<button id="ingresar" class="botones">Ingresar</button>
<hr>
<p>o ingresa por:</p>
<hr>
<button id="ingresarGoogle" >Google</button>
<p>¿ No tienes cuenta ?</p><a href="#/registro">Registrate</a>

</div>`;

const divAcceso = document.createElement('div');
divAcceso.setAttribute("class", "contenedorVista");
divAcceso.innerHTML = viewHome;
document.getElementById('contenedor').appendChild(divAcceso);


const botonGoogle = document.querySelector('#ingresarGoogle');
botonGoogle.addEventListener('click', () => {
  loginGoogle();
});


const botonRegistro = document.querySelector('#ingresar');
botonRegistro.addEventListener('click', () => {
    let correoDos = document.getElementById('correo2').value;
    let contraseñaDos = document.getElementById('contraseña2').value;
    acceso(correoDos,contraseñaDos);
    autentificacion(correoDos,contraseñaDos);
  });
  return divAcceso;
};







