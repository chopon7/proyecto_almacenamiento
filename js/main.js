const header = document.querySelector(".header");
const modo = document.querySelector(".header__theme")

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