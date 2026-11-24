export function esNombreValido(nombre) {
    if (nombre.trim().length < 3) {
        return false;
    }

    return true;
}

export function esEmailValido(correo) {
    if (!correo.includes("@") || !correo.includes(".")) {
        return false;
    }

    return true;
}

export function esContraseniaValida(contrasenia) {
    if (contrasenia.length < 8) {
        return false;
    }

    return true;
}

export function esPlanValido(plan) {
    if (plan === "basico" || plan === "pro" || plan === "master") {
        return true;
    }

    return false;
}

export function esTerminosAceptados(checked) {
    if (!checked) {
        return false;
    }

    return true;
}