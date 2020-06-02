export const registro = (correo, contraseña) => {
  
firebase.auth().createUserWithEmailAndPassword(correo, contraseña).catch((error)=> {
    var errorCode = error.code;
    var errorMessage = error.message;
if(errorCode==="auth/invalid-email"){
  alert("Correo invalido")
} else if(errorCode==="auth/weak-password"){
  alert("La contraseña debe tener minimo 6 carácteres")
}else if(errorCode==="auth/email-already-in-use"){
alert("Cuenta existente")
}
  });
};

export const acceso = (correoDos, contraseñaDos) => {
  firebase.auth().signInWithEmailAndPassword(correoDos, contraseñaDos).catch((error)=> {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode==="auth/invalid-email"){
      alert("Correo invalido")
    } else if(errorCode==="auth/wrong-password"){
      alert("Contraseña invalida o no posee contraseña")
    }
  });
};

export const autentificacion=(correoDos,contraseñaDos)=>{
  firebase.auth().onAuthStateChanged((user) =>{
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      document.getElementById("bienvenida").innerHTML="Bienvenida" + displayName;
    } else {

    }
  });
}

