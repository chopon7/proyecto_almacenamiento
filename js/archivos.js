const marco = document.querySelector(".archivos");
const estado = document.querySelector(".estao");
const botonTema = document.querySelector(".header__theme");

const CLAVE_TEMA = "tema";

function leerJSON(clave, valorPorDefecto) {
    try {
        const valorGuardado = localStorage.getItem(clave);
        return valorGuardado ? JSON.parse(valorGuardado) : valorPorDefecto;
    } catch {
        return valorPorDefecto;
    }
}

function guardarJSON(clave, valorPorDefecto) {
    localStorage.setItem(clave, JSON.stringify(valorPorDefecto));
}

if (leerJSON(CLAVE_TEMA, "oscuro") === "claro") {
    document.documentElement.classList.add("claro");
}

botonTema?.addEventListener("click", () => {
    const esClaro = document.documentElement.classList.toggle("claro");
    guardarJSON(CLAVE_TEMA, esClaro ? "claro" : "oscuro");
});

const ICONOS = {
    documento: "Icono_Documento_Texto.webp",
    audio: "Icono_Audio.webp",
    video: "Icono_Video.webp",
    imagen: "Icono_Imagen.webp",
    datos: "Icono_Datos.webp",
    comprimido: "Icono_Comprimidos-Empaquetados.webp",
};

function formatearFecha(fechaISO) {
    return new Date(fechaISO + "T00:00").toLocaleDateString("es-MX", {
        day: "numeric", month: "short", year: "numeric",
    });
}

function crearTarjeta(archivo) {
    const icono = "../assets/icons/icon_format/" + (ICONOS[archivo.tipo] ?? ICONOS.documento);

    const tarjeta = document.createElement("article");
    tarjeta.className = "archivo";
    tarjeta.innerHTML = `
        <div class="archivo__cabecera">
            <img class="icono archivo__icono" src="${icono}" alt="" width="20" height="20">
            <span class="archivo__nombre"></span>
            <button class="boton-icono" type="button" aria-label="Más opciones">
                <img class="icono" src="../assets/icons/icon_utils/Icono_mas_opciones.webp" alt="" width="20" height="20">
            </button>
        </div>
        <div class="archivo__miniatura">
            <img class="icono" src="${icono}" alt="" width="100" height="100">
        </div>
        <p class="archivo__pie">
            ${archivo.propietario} · ${formatearFecha(archivo.fecha)}
        </p>`;

    // textContent en vez de innerHTML para el nombre: evita inyectar HTML
    const nombre = tarjeta.querySelector(".archivo__nombre");
    nombre.textContent = archivo.nombre;
    nombre.title = archivo.nombre;
    return tarjeta;
}

async function cargarArchivos() {
    estado.hidden = false;
    estado.textContent = "Cargando archivos…";
    marco.replaceChildren();

    try {
        const respuesta = await fetch("../data/archivos.json");
        if (!respuesta.ok) {
            // Que hace esto??
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const archivos = await respuesta.json();

        if (archivos.length === 0) {
            estado.textContent = "Todavía no tienes archivos.";
            return;
        }

        marco.replaceChildren(...archivos.map(crearTarjeta));
        estado.hidden = true;
    } catch (error) {
        console.error(error);
        estado.textContent = "No pudimos cargar tus archivos. Revisa tu conexión e inténtalo de nuevo.";

        const r = await Swal.fire({
            icon: "error",
            title: "Error al cargar",
            text: "No se pudieron obtener tus archivos.",
            showCancelButton: true,
            confirmButtonText: "Reintentar",
            cancelButtonText: "Cerrar",
        });
        if (r.isConfirmed) cargarArchivos();
    }
}

cargarArchivos();