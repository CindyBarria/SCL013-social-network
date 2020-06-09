// importamos la funcion que vamos a testear
import {
  loginGoogle, registro, acceso, autentificacion,
} from '../src/lib/controlador-firebase.js';

describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});

describe('registro', () => {
  it('debería ser una función', () => {
    expect(typeof registro).toBe('function');
  });
});

describe('acceso', () => {
  it('debería ser una función', () => {
    expect(typeof acceso).toBe('function');
  });
});

describe('autentificacion', () => {
  it('debería ser una función', () => {
    expect(typeof autentificacion).toBe('function');
  });
});
