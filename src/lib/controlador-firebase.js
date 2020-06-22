// Función para registrar usuarios con cuentas google

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.hash = '#/muro';
    })
    .catch(() => {
    });
};

// Función que llama el usuario actual de google
export const usuario = () => firebase.auth().currentUser;


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
      const image = document.querySelector('#fotoPublicacion');
      image.src = url;
    });
};

// agregar publicacion
export const agregarPublicacion = () => {
  const texto = document.querySelector('#texto').value;
  const image = document.querySelector('#imagen').value;
  const fecha = new Date();
  const user = usuario();
  firebase.firestore().collection('publicaciones').add({
    nombre:user.displayName,
    uid: user.uid,
    publicacion: texto,
    imagen: image,
    fecha,
    likes:[],
    foto:user.photoURL,
  }).then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
    document.querySelector('#texto').value = '';
    document.querySelector('#imagen').value = '';
  })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};
// Boton like
const likeAndUnlike = (postIdLike) =>{
  firebase.firestore().collection('publicaciones').doc(`${postIdLike}`).get().then((doc) => {
    const usuario = firebase.auth().currentUser;
    const userId = usuario.uid;
    const docLikes = doc.data().likes;
    const includesUser = docLikes.includes(userId);
    if (includesUser === true) {
      firebase.firestore().collection('publicaciones').doc(`${postIdLike}`).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userId),
      });
      console.log("LIKE SACADO");
    } else if (includesUser === false) {
      firebase.firestore().collection('publicaciones').doc(`${postIdLike}`).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userId),
       
      });
      console.log("LIKE AGREGADO");
    }
  });
  }
// funcion eliminar
const eliminarPublicacion = (id) => {
  firebase.firestore().collection('publicaciones').doc(id).delete()
    .then(() => {
    })
    .catch((error) => {
      console.error('Error removing document:', error);
    });
};

// funcion editar
const editar = (id) => {
  // boton guardar cambios
  const botonEditar = document.querySelector('#editar');
  botonEditar.addEventListener('click', () => {
    document.querySelector('#editar').style.display = 'none';
    document.querySelector('#publicar').style.display = 'block';
    // guarda texto editado
    const texto = document.querySelector('#texto').value;
    const publicacionRef = firebase.firestore().collection('publicaciones').doc(id);
    return publicacionRef.update({
      publicacion: texto,
    }).then(() => {
      console.log('Document successfully updated!');
      document.querySelector('#texto').value = '';
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  });
};


// leer datos y eliminar datos
export const leerDatos = () => {
  const publicacionMuro = document.querySelector('#post');
  firebase.firestore().collection('publicaciones').orderBy('fecha', 'desc').onSnapshot((querySnapshot) => {
    publicacionMuro.innerHTML = '';
    const usuario = firebase.auth().currentUser;
       const userId = usuario.uid;
       console.log(userId, 'id usuario')
    querySnapshot.forEach((doc) => {
     if(doc.data().imagen){
      publicacionMuro.innerHTML += `
      <div id='postear' data-id='${doc.id}'>
      <img class='perfilFoto' src="${doc.data().foto}">
      <h2 id='nombreUsuario'>${doc.data().nombre}</h2>
      <p id='fechaPublicado'>${new Date().toLocaleString()}</p>
      <p id='textoPublicado' data-publicacion='${doc.data().publicacion}'>${doc.data().publicacion}</p>
      <img id='fotoPublicacion' />
      <div class='botonesPost'>
      <button class='eliminar'><i id = 'borrar' class="far fa-trash-alt"></i></button>
      <button class='editar'><i id = 'edit' class="far fa-edit"></i></button>
      </div>
      <div class="like-counter">
        <div class='like ${(doc.data().likes) ? 'heart' : 'heart-2'}'></div>
        <p class="counter-text">${doc.data().likes.length}</p>
      </div>
      </div>
      </div>`;
     }else {
      publicacionMuro.innerHTML += `
      <div id='postear' data-id='${doc.id}'>
      <img class='perfilFoto' src="${doc.data().foto}">
      <h2 id='nombreUsuario'>${doc.data().nombre}</h2>
      <p id='fechaPublicado'>${new Date().toLocaleString()}</p>
      <p id='textoPublicado' data-publicacion='${doc.data().publicacion}'>${doc.data().publicacion}</p>
      <div class='botonesPost'>
      <button class='eliminar'><i id = 'borrar' class="far fa-trash-alt"></i></button>
      <button class='editar'><i id = 'edit' class="far fa-edit"></i></button>
      </div>
      <div class="like-counter">
        <div class='like ${(doc.data().likes) ? 'heart' : 'heart-2'}'></div>
        <p class="counter-text">${doc.data().likes.length}</p>
      </div>
      </div>
      </div>`;
     }
        // Boton eliminar
        const eliminar = publicacionMuro.querySelectorAll('.eliminar');
        eliminar.forEach((btn) => {
          btn.addEventListener('click', (event) => {
            const confirmar = confirm('¿Desea eliminar publicacion?');
            if (confirmar === true) {
              const borrarPostId = event.target.parentElement.parentElement.getAttribute('data-id');
              eliminarPublicacion(borrarPostId);
            }
          });
        });

      // Boton editar ---------------------------------
      const botonEditar = document.querySelectorAll('.editar');
      botonEditar.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          window.scrollTo(0,0)
          document.querySelector('#publicar').style.display = 'none';
          document.querySelector('#editar').style.display = 'block';
          // ID del texto que se quiere editar
          const idPost = event.target.parentElement.parentElement.getAttribute('data-id');
          // firebase
          const docRef = firebase.firestore().collection('publicaciones').doc(idPost);
          docRef.get().then(() => {
          // Guarda texto de la publicacion que se quiere editar
            const textoEditado = doc.data().publicacion;
            // coloca texto en textarea
            document.querySelector('#texto').value = textoEditado;
            editar(idPost, textoEditado);
          });
        });
      });
      //like
      const likeBtn = document.querySelectorAll('.like');
      likeBtn.forEach((btn)=>{
        btn.addEventListener('click',(event)=>{
          event.preventDefault();
          const postIdLike = event.target.parentElement.parentElement.getAttribute('data-id');
          likeAndUnlike(postIdLike);
          likeHeart(postIdLike)
        })
      })
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
