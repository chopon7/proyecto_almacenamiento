export function mostrarError(form, nombre, mensaje) {
    const span = form.querySelector(`[data-error-para="${nombre}"]`);

    if (span) {
        span.textContent = mensaje;
    }

    form.elements[nombre]?.classList.add("invalido");
}

export function mostrarErroresNativos(form) {
    const invalidos =[...form.elements].filter((campo) => !campo.checkValidity());

    invalidos.forEach((campo) => {
        mostrarError(form,campo.name,campo.validationMessage);
    });

    invalidos[0]?.focus();
}

export function limpiarErrores(form) {
    form.querySelectorAll("[data-error-para]").forEach(span => { span.textContent = "";});
    form.querySelectorAll(".invalido").forEach(campo => {campo.classList.remove("invalido");});
}

export function limpiarError(campo) {
    campo.classList.remove("invalido");

    const grupo = campo.closest(".formulario__grupo");

    if (!grupo) return;

    const span =
        grupo.querySelector(".error-campo");

    if (span) {
        span.textContent = "";
    }
}