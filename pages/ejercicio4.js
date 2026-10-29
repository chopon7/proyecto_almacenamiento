const datos = [
    { nombre: "Video1", formato: "mp4", tamañoGB: 7, fecha: "2023-03-15" },
    { nombre: "Video2", formato: "avi", tamañoGB: 3, fecha: "2023-02-20" },
    { nombre: "VideoAnimacion", formato: "mkv", tamañoGB: 5, fecha: "2023-03-10" },
    { nombre: "Tutorial", formato: "mp4", tamañoGB: 2, fecha: "2023-04-02" },
    { nombre: "Documental", formato: "mkv", tamañoGB: 9, fecha: "2023-01-28" },
];



const fechaLimite = new Date("2023-03-01");
const filtrados = datos.filter(({ fecha }) => new Date(fecha) > fechaLimite);
console.log("Filtrados:", filtrados);


const total = datos.reduce((suma, { tamañoGB }) => suma + tamañoGB, 0);
console.log("Total tamaño GB:", total);


const promedio = total / datos.length;
console.log("Promedio tamaño GB:", promedio);


const ordenados = [...datos].sort((a, b) => b.tamañoGB - a.tamañoGB);

console.log({ filtrados, total, promedio, ordenados });

console.log("Original:", datos);



"use strict";
function crearContador() {
    let cuenta = 0;

    return function () {
        cuenta++;
        return cuenta;
    };
}

const contadorA = crearContador();
const contadorB = crearContador();

console.log("contadorA:", contadorA()); // 1
console.log("contadorA:", contadorA()); // 2
console.log("contadorB:", contadorB()); // 1 


const multiplicador = 2

function funcion_padre() {
    const multiplicador = 10

    function funcion_hija(value) {
        return value * multiplicador;
    }

    return funcion_hija;
}

const calcular_operacion = funcion_padre
zcalcular_operacion(5) // 50, no 10


console.log(presentar.call({ nombre: "Video2" })); // Hola, soy Video2


// ============================================================
// 3. CLASS
// ============================================================

class Auto {
    #kilometraje;

    constructor(marca, modelo, año, kilometraje) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.kilometraje = kilometraje;
    }

    get kilometraje() {
        return this.#kilometraje;
    }

    set kilometraje(valor) {
        if (valor < 0 || valor < this.#kilometraje) {
            throw new Error("El kilometraje no puede ser negativo ni disminuir");
        }
        this.#kilometraje = valor;
    }

    conducir(km) {
        this.kilometraje = this.#kilometraje + km;
        return `${this.marca} ${this.modelo} recorrió ${km} km`;
    }

    describir() {
        return `${this.marca} ${this.modelo} ${this.año} (${this.#kilometraje} km)`;
    }
}


class AutoElectrico extends Auto {
    constructor(marca, modelo, año, kilometraje, duracionBateriaKm) {
        super(marca, modelo, año, kilometraje);
        this.duracionBateriaKm = duracionBateriaKm;
    }

    cargar() {
        return (`${this.marca} ${this.modelo} cargado: ${this.duracionBateriaKm} km de autonomía`);
    }

    describir() {
        return (`${super.describir()} - eléctrico, ${this.duracionBateriaKm} km de autonomía`);
    }
}

const sedan = new Auto("Toyota", "Corolla", 2020, 45000);
const electrico = new AutoElectrico("Tesla", "Model 3", 2023, 12000, 500);

console.log(sedan.describir());
console.log(electrico.describir());
console.log("Kilometraje:", sedan.kilometraje, "km");

// Métodos heredados y propios
console.log(electrico.conducir(150)); // Tesla Model 3 recorrió 150 km
console.log(electrico.cargar());      // Tesla Model 3 cargado: 500 km de autonomía
console.log("Nuevo kilometraje:", electrico.kilometraje); // 12150

// El setter valida el nuevo valor
try {
    sedan.kilometraje = 1000; // intento de "regresar" el odómetro
} catch (error) {
    console.log("Setter rechazó el valor:", error.message);
}

// El campo privado no aparece ni se puede acceder desde fuera
console.log("Objeto sedan:", sedan); // no muestra #kilometraje como propiedad normal
console.log("¿electrico es un Auto?", electrico instanceof Auto); // true
// console.log(sedan.#kilometraje); // SyntaxError: campo privado
