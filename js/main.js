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
const form = document.getElementById("formulario");


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

header.addEventListener("click", (e) => {
    if (!burger.contains(e.target)) setMenu(false);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
});

document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) setMenu(false);
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