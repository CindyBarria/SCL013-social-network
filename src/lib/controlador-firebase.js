// Función para registrar usuarios con cuentas google

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(() => {
  });
};

// Función de registro para nuevos usuarios

export const registro = (correo, contraseña) => {
  firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
    .then(alert('Registro exitoso'))
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        alert('Correo invalido');
      } else if (errorCode === 'auth/weak-password') {
        alert('La contraseña debe tener minimo 6 carácteres');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('Cuenta existente');
      }
    });
};

// Función de acceso de usuario registrado

export const acceso = (correoDos, contraseñaDos) => {
  firebase.auth().signInWithEmailAndPassword(correoDos, contraseñaDos).catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-email') {
      alert('Correo invalido');
    } else if (errorCode === 'auth/wrong-password') {
      alert('Contraseña invalida o no posee contraseña');
    }
  });
};

// Función de autentificación de usuario registrado

export const autentificacion = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // const displayName = user.displayName;
      // const email = user.email;
    }
  });
};

// Función para subir imagen con FireStore

export const subirImagen = () => {
  const ref = firebase.storage().ref();
  const file = document.querySelector('#imagen').files[0];
  const name = new Date() + file.name;
  const metadata = { contentType: file.type };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
      alert('Imagen cargada Exitosamente');
      const image = document.querySelector('#photo');
      image.src = url;
    });
};
