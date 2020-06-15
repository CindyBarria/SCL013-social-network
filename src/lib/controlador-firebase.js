// Función para registrar usuarios con cuentas google

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    const user = result.user;
      window.location.hash = '#/muro';
    })
    .catch(() => {
    });
};

// Función que llama el usuario actual de google
export const usuario = () => {
  return firebase.auth().currentUser
}

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
    .then(() => {
      window.location.hash = '#/muro';
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
      const image = document.querySelector('#photo');
      image.src = url;
    });
};

// agregar publicacion

export const agregarPublicacion = () => {
  const texto = document.querySelector('#texto').value;
  const image = document.querySelector('#imagen').value;
  const fecha = new Date();
  firebase.firestore().collection('publicaciones').add({
    publicacion: texto,
    imagen: image,
    fecha:fecha
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      document.querySelector('#texto').value = '';
      document.querySelector('#imagen').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

// leer datos y eliminar datos
export const leerDatos = () => {
  const publicacionMuro = document.querySelector('#post');
  firebase.firestore().collection('publicaciones').orderBy('fecha','desc').onSnapshot((querySnapshot) => {
    publicacionMuro.innerHTML = '';
    querySnapshot.forEach((doc) => {
     // console.log(`${doc.id} => ${doc.data().publicacion}`)
      publicacionMuro.innerHTML += `
      <div id='postear' data-id='${doc.id}'>
      <h2 id='nombreUsuario'></h2>
      <p id='textoPublicado' data-publicacion='${doc.data().publicacion}'>${doc.data().publicacion}</p>
      <img id='photo'/>
      <div class='boton'>
      <button class='eliminar''>Eliminar</button>
      <button class='editar'>Editar</button>
      <div class='countBtn'>
      <button class='meGusta' id='like'>Me gusta</button>
      </div>
      <div class='countNum'>
      <h3>0</h3>
      </div>
      </div>
      </div>`;

  var div1 = publicacionMuro.querySelector('#postear');
 // div1.innerHTML='';
  var align = div1.getAttribute('data-id');
  console.log(align , 'align')
  
  var div2 = publicacionMuro.querySelector('#textoPublicado');
  //div2.innerHTML='';
  var align2 = div2.getAttribute('data-publicacion');
  console.log(align2 ,'align2')

   const eliminar = publicacionMuro.querySelectorAll('.eliminar') 
   
    eliminar.forEach(btn => {
      btn.addEventListener('click', (event) => {
        let borrarPostId = event.target.parentElement.parentElement.getAttribute('data-id');
        eliminarPublicacion(borrarPostId);
      })
    })   
})
})
}
//funcion eliminar
const eliminarPublicacion = (id) => {
  firebase.firestore().collection('publicaciones').doc(id).delete()
  .then(() => {
    
   // window.location.reload();
  })
  .catch((error) => {
    console.error('Error removing document:', error);
  });
}

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
