//Función para registrar usuarios con cuentas google 
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
};

//Función de registro para nuevos usuarios 
export const registro = (correo, contraseña) => {
  firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(alert('Registro exitoso')).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode === 'auth/invalid-email') {
      alert('Correo invalido')
    } else if (errorCode === 'auth/weak-password') {
      alert('La contraseña debe tener minimo 6 carácteres')
    } else if (errorCode === 'auth/email-already-in-use') {
      alert('Cuenta existente')
    };
  });
};
//Función de acceso de usuario registrado
export const acceso = (correoDos, contraseñaDos) => {
  firebase.auth().signInWithEmailAndPassword(correoDos, contraseñaDos).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode === 'auth/invalid-email') {
      alert('Correo invalido');
    } else if (errorCode === 'auth/wrong-password') {
      alert('Contraseña invalida o no posee contraseña');
    }
  });
};

//Función de autentificación de usuario registrado
export const autentificacion = (correoDos, contraseñaDos) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
    } 
  });
};
//Función para subir imagen con FireStore
export const subirImagen = () => {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#imagen").files[0];
  const name = new Date() + '-' + file.name;
  const metadata = { contentType:file.type }
  const task = ref.child(name).put(file, metadata);
  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url =>{
    console.log(url);
    alert("Imagen cargada Exitosamente");
    const image = document.querySelector('#photo');
    image.src = url;
    })
}