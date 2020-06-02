import { ingresar } from './View/acceso.js';
import { registrar } from './View/registro.js';

const cambioVista=(route)=>{
        const contenedor=document.getElementById("contenedor");
        contenedor.innerHTML='';
        switch (route) {
         
            case '#/': {
                return contenedor.appendChild(ingresar());
            }
    
            case '#/registro': {
                return contenedor.appendChild(registrar());
            }
    
            default:
                break;
        }
        console.log(route);
} 
export {cambioVista};
 