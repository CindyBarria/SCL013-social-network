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
  firebase.auth().signInWithEmailAndPassword(correoDos, contraseñaDos)
    .then((user) => {
      window.location.hash = '#/muro';
      const email = user.email;
      if (email === user.email) {
        alert('Hola');
      }
    }).catch((error) => {
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

// agregar publicacion

export const agregarPublicacion = () => {
  const texto = document.querySelector('#texto').value;

  firebase.firestore().collection('publicaciones').add({
    publicacion: texto,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      document.querySelector('#texto').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

// leer datos

export const leerDatos = () => {
  const publicacionMuro = document.querySelector('#post');
  publicacionMuro.innerHTML = '';
  firebase.firestore().collection('publicaciones').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().publicacion}`);
      publicacionMuro.innerHTML += `
        <div id='post'>
<h2 id='nombreUsuario'>${doc.id}</h2>
<p id='textoPublicado'>${doc.data().publicacion}</p>
<img id="photo"/>
<div class='boton'>
<button class='editar'>Eliminar</button>
<button class='editar'>Editar</button>
</div>
</div>`;
    });
  });
};

// cerrar sesion

export const cerrar = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.hash = '#/cerrarSesion';
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
