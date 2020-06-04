import { acceso, autentificacion, loginGoogle } from '../lib/controlador-firebase.js';
export const ingresar = () => {
  const viewHome = `

<img class="fondo" src="../img/fondo.jpg" />
<img class="logo" src="../img/logo.png" />
<div class="portada">
<h1>Inicia Sesion</h1>
<input type="email" id="correo2" placeholder="Correo"/>
<span class="fas fa-envelope" ></span>
<input type="password" id="contraseña2" placeholder="Contraseña"/>
<span class="fas fa-key"></span>
<button id="ingresar" class="botones">Ingresar</button>
<hr>
<p>o ingresa por:</p>
<hr>
<img id="ingresarGoogle" src="../img/google.png" />
<p id="irRegistrar">¿ No tienes cuenta ? <a href="#/registro">Registrate</a>
</p>
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
    acceso(correoDos, contraseñaDos);
    autentificacion(correoDos, contraseñaDos);
  });
  return divAcceso;
};
