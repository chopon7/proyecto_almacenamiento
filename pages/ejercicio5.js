
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


const persona_flecha = {
    nombre: "Alberto",
    Presentarse: function () {
        const funcion_flecha = () => {
            console.log(`Hola, soy ${this.nombre}, mucho gusto`);
        };
        funcion_flecha();
    }
};

persona_flecha.Presentarse();

const persona_sin_flecha = {
    nombre: "Alberto",
    Presentarse: function () {
        function funcion_regular() {
            console.log(`Hola, soy ${this.nombre}, mucho gusto`);
        };
        funcion_regular();
    }
};

persona_sin_flecha.Presentarse();



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


console.log(electrico.conducir(150));
console.log(electrico.cargar());
console.log("Nuevo kilometraje:", electrico.kilometraje);


try {
    sedan.kilometraje = 1000;
} catch (error) {
    console.log("Setter rechazó el valor:", error.message);
}


console.log("Objeto sedan:", sedan);
console.log("¿electrico es un Auto?", electrico instanceof Auto);

