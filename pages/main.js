const buscador = document.querySelector(".header__barra--input");


buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    document.querySelectorAll(".archivo").forEach((t) => {
        const coincide = t.textContent.toLowerCase().includes(texto);
        t.hidden = !coincide;
    });
});