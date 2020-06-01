export default () => {
const viewHome = `
<h1>Inicia Sesion</h1>
<input type="email" id="emailA" placeholder="Correo"/>
<input type="password" id="passwordA" placeholder="Contraseña"/>
<button id="ingresar">Ingresar</button>`;

const divELement = document.createElement('div');
divELement.innerHTML = viewHome;
return divELement;
}

const enviar = () => {
    let correo = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(correo, contraseña).catch(function(error) {
        
    let errorCode = error.code;
    let errorMessage = error.message;
    alert (errorMessage);
        
});
};

