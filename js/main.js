import {
    esNombreValido,
    esEmailValido,
    esContraseniaValida,
    esPlanValido,
    esTerminosAceptados
} from "./validators.js";

import {
    limpiarErrores,
    limpiarError,
    mostrarErroresNativos
} from "./ui.js";

const header = document.querySelector(".header");
const modo = document.querySelector(".header__theme")
const cuenta = document.querySelector(".header__cuenta-boton");
const opcionesCuenta = document.querySelector(".header__cuenta-opciones");
const form = document.getElementById("formulario");

// Boton de cambio de tema
function setMenu(open) {
    header.classList.toggle("header--open", open);
}
function setModo() {
    document.documentElement.classList.toggle("claro");
}

if (modo) {
    modo.addEventListener("click", () => {
        setModo();
    });
}

cuenta.addEventListener('click', (e) => {
    console.log("click en cuenta");
    e.stopPropagation();
    const abierto = opcionesCuenta.classList.toggle('abierto');
    cuenta.setAttribute('aria-expanded', abierto);
});


header.addEventListener("click", (e) => {
    if (!opcionesCuenta.contains(e.target) || !burger.contains(e.target)) {
        desactivarMenu();
    }
});

function desactivarMenu() {
    setMenu(false);
    opcionesCuenta.classList.remove('abierto');
    cuenta.setAttribute('aria-expanded', 'false');
}

document.addEventListener("keydown" || "click", (e) => {
    if (e.key === "Escape") setMenu(false);
});

// Validación de campos individuales
function validarNombre(campo) {
    campo.setCustomValidity(esNombreValido(campo.value) ? "" : "El nombre debe tener al menos 3 caracteres");
}

function validarCorreo(campo) {
    campo.setCustomValidity(esEmailValido(campo.value) ? "" : "Correo electrónico inválido"
    );
}

function validarContrasenia(campo) {
    campo.setCustomValidity(esContraseniaValida(campo.value) ? "" : "La contraseña debe tener al menos 8 caracteres");
}

function validarTerminos(campo) {
    campo.setCustomValidity(esTerminosAceptados(campo.checked) ? "" : "Debes aceptar los términos y condiciones");
}

function validarFormulario() {
    validarNombre(form.elements.nombre_usuario);
    validarCorreo(form.elements.correo);
    validarContrasenia(form.elements.contrasenia);
    validarTerminos(form.elements.terminos_aceptados);

    const plan = form.querySelector('input[name="plan"]:checked');

    return plan && esPlanValido(plan.value) && form.checkValidity();
}

// Eventos del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    console.log(datos);
    limpiarErrores(form);

    if (!validarFormulario()) {
        mostrarErroresNativos(form);
        return;
    }

    console.log("Formulario válido");

    form.reset();
    form.elements.nombre_usuario.focus();
});

form.addEventListener("input", (e) => {
    limpiarError(e.target);
});