import { componentes } from '../View/index.js';

const cambioVista=(route)=>{
        const contenedor=document.getElementById("contenedor")
        contenedor.innerHTML=''
        switch (route) {
         
            case '#/': {
                return contenedor.appendChild(componentes.acceso())
            }
    
            case '#/registro': {
                return contenedor.appendChild(componentes.registro())
            }
    
            default:
                break;
        }
        console.log(route)
} 
export {cambioVista}
