import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser'); // Importar cosas en JS
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); // Servidor Web Estatico
  app.use(cookieParser('Me agradan los poliperros')); // Secreto Cookies
  app.use(// Session
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );

  await app.listen(3000); // PUERTO
  // package.json
  // npm run start
}

bootstrap();

/*


abstract class Nombre {
    public nombrePropiedad?: string; // undefined
    private apellidoPropiedad: string = 'Eguez';
    protected edad = 1; // number (Duck Typing)
    static comun: number = 10;
    propiedadPublica: string;
    constructor(
        propiedadPublicaParametro: string, // parametro
        public propiedadRapido: string, // transforma una propiedad
    ) {
        this.propiedadPublica = propiedadPublicaParametro;
        this.propiedadRapido;
    }

    public funcionPublica(parametroString: string): void {
        // no hay return = undefined
    }

    private funcionPrivada(parametroString: string, // ? = puede ser undefined
                           parametroNumber?: number)  { // omitir :void (defecto)
        // no hay return = undefined
    }

    protected funcionPublica(): number {
        return 1;
    }

    static funcionEstatica(): string {
        return 'string';
    }

}
// package.json
// npm run start
// nodejs command prompt

/// VARIABLES
// TIPOS DE VARIABLES

// MUTABLES ( reasignar -> = )
var variableUno = 1; // NO USAMOS VAR !
let variableDos = 2;
variableUno = 3;
variableDos = 4;
// INMUTABLES ( No se pueden reasignar X -> != )
const variableTres = 5;
// variableTres = 2; // ERROR!

// PRIMITIVAS PRIMITIVAS (Typescript)

const texto: string = ''; // "" ``
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudiante: boolean = true; // false
const noDefinido = undefined;
const noHayNada = null;
const fecha: Date = new Date();
// Duck Typing
const textoDos = 'Adrian';
let cualquierCosa: any = 'Vicente';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario {
    constructor(
        public nombre: string,
        public apellido: string
    ) {
    }
}

const usuario: Usuario = new Usuario('Adrian', 'Eguez');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number; // ? => Opcional // Valor por defecto es undefined
}

let objetoUsuario: UsuarioInterface = {
    nombre: 'Adrian',
    apellido: 'Eguez',
};
objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;
console.log(usuario);
console.log(objetoUsuario);

// PUNTEROS REFERENCIAS

// PRIMITIVAS
let edadAntigua = 22;
let otraEdad = edadAntigua; // VALOR
edadAntigua += 1; // 23
otraEdad -= 1; // 21

// Objeto
let objetoEdad = {
    edad: 22,
};
let otraEdadObjeto = objetoEdad; // REFERENCIA
otraEdadObjeto.edad = otraEdadObjeto.edad + 1; // 23
console.log(otraEdadObjeto.edad);
objetoEdad.edad; // 23
console.log(otraEdadObjeto.edad);
objetoEdad.edad = objetoEdad.edad + 1; // 24
otraEdadObjeto.edad; // 24
let otraEdadObjetoClonado = {...objetoEdad}; // Clonación Objetos
const arregloEjemplo = [1, 2, 3]
let arregloClonado = [...arregloEjemplo]; // Clonación Arreglos

// Arreglos

const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3, 4, 5];

function funcionConNombre() {
}

const indice = arregloNumeros
    .findIndex(
        (numero) => { // Funcion Anonima xq no tiene nombre
            const elValorEsIgualAtres: boolean = numero === 3;
            return elValorEsIgualAtres  // Condicion -> boolean
        },
        // function () { -> Funcion Anonima xq no tiene nombre
        //
        // }
    );
arregloNumeros[indice] = 6
// agregar al final
arregloNumeros.push(6)
// agregar al principio
arregloNumeros.unshift(0)

// CONDICIONES -> Truty y Falsy
const numeroOrden = 0;
if (numeroOrden) {
  console.log('Truty');
} else {
  console.log('Falsy'); // FALSY
}
if (1) {
  console.log('Truty'); // TRUTY
} else {
  console.log('Falsy');
}
if (-1) {
    console.log('Truty'); // TRUTY
} else {
    console.log('Falsy');
}
if ("") {
    console.log('Truty');
} else {
    console.log('Falsy'); // FALSY
}
if ("a") {
    console.log('Truty'); // TRUTY
} else {
    console.log('Falsy');
}
if ({}) {
    console.log('Truty');
} else {
    console.log('Falsy'); // FALSY
}
if ({a:1}) {
    console.log('Truty'); // TRUTY
} else {
    console.log('Falsy');
}
if ([]) {
    console.log('Truty');
} else {
    console.log('Falsy'); // FALSY
}
if ([1]) {
    console.log('Truty');// TRUTY
} else {
    console.log('Falsy');
}
if (null) {
    console.log('Truty');
} else {
    console.log('Falsy'); // FALSY
}
if (undefined) {
    console.log('Truty');
} else {
    console.log('Falsy'); // FALSY
}



*/
