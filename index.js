const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

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

burger.addEventListener("click", () => {
    setMenu(!header.classList.contains("header--open"));
});

header.addEventListener("click", (e) => {
    if (!burger.contains(e.target)) setMenu(false);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
});

document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) setMenu(false);
});