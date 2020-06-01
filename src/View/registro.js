export default () => {
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
  
    firebase.auth().createUserWithEmailAndPassword(correo, contraseña).catch((error) => {
        
    let errorCode = error.code;
    let errorMessage = error.message;
    alert (errorMessage);
        
  });
  });
  return divELement;







/*const boton = document.getElementById('registrarse');
boton.addEventListener('click',enviar);*/


};
