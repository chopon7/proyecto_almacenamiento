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
    mostrarErroresNativos,
    mostrarMensaje
} from "./ui.js";

const URL_API = "../api/usuarios.php";

const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const modo = document.querySelector(".header__theme");
const cuenta = document.querySelector(".header__cuenta-boton");
const opcionesCuenta = document.querySelector(".header__cuenta-opciones");

const form = document.getElementById("formulario");
const listaUsuarios = document.getElementById("lista-usuarios");
const estadoUsuarios = document.getElementById("estado-usuarios");

// Menú y cambio de tema
function setMenu(open) {
    header?.classList.toggle("header--open", open);
}

function setModo() {
    document.documentElement.classList.toggle("claro");
}

modo?.addEventListener("click", () => {
    setModo();
});

burger?.addEventListener("click", () => {
    setMenu(!header.classList.contains("header--open"));
});

cuenta?.addEventListener("click", (e) => {
    e.stopPropagation();
    const abierto = opcionesCuenta?.classList.toggle("abierto");
    cuenta.setAttribute("aria-expanded", abierto);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        setMenu(false);
        opcionesCuenta?.classList.remove("abierto");
    }
});

// Validación de campos individuales
function validarNombre(campo) {
    campo.setCustomValidity(esNombreValido(campo.value) ? "" : "El nombre debe tener al menos 3 caracteres");
}

function validarCorreo(campo) {
    campo.setCustomValidity(esEmailValido(campo.value) ? "" : "Correo electrónico inválido");
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

// Peticiones a la API en PHP (GET y POST)
async function cargarUsuarios() {
    estadoUsuarios.classList.remove("error");
    estadoUsuarios.textContent = "Cargando usuarios...";

    try {
        const respuesta = await fetch(URL_API);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const usuarios = await respuesta.json();

        if (usuarios.length === 0) {
            estadoUsuarios.textContent = "Aún no hay usuarios registrados.";
            listaUsuarios.replaceChildren();
            return;
        }

        estadoUsuarios.textContent = "";
    } catch (error) {
        console.error(error);
        estadoUsuarios.classList.add("error");
        estadoUsuarios.textContent = "No se pudieron cargar los usuarios. Verifica que el servidor PHP esté encendido.";
    }
}

async function registrarUsuario(nuevoUsuario) {
    const respuesta = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudo registrar el usuario");
    }

    return datos;
}

// Eventos del formulario
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErrores(form);
    mostrarMensaje(form, "");

    if (!validarFormulario()) {
        mostrarErroresNativos(form);
        return;
    }

    const planSeleccionado = form.querySelector('input[name="plan"]:checked').value;

    const nuevoUsuario = {
        nombre_usuario: form.elements.nombre_usuario.value.trim(),
        contrasenia: form.elements.contrasenia.value,
        correo: form.elements.correo.value.trim(),
        plan: planSeleccionado,
        terminos_aceptados: form.elements.terminos_aceptados.checked,
    };

    try {
        const creado = await registrarUsuario(nuevoUsuario);
        form.reset();
        form.elements.nombre_usuario.focus();
        mostrarMensaje(form, `Usuario "${creado.nombre_usuario}" registrado correctamente.`, false);
        await cargarUsuarios();
    } catch (error) {
        mostrarMensaje(form, error.message, true);
    }
});

form.addEventListener("input", (e) => {
    limpiarError(e.target);
    mostrarMensaje(form, "");
});

form.addEventListener("reset", () => {
    limpiarErrores(form);
    mostrarMensaje(form, "");
});

// Cargar la lista inicial al abrir la página
cargarUsuarios();