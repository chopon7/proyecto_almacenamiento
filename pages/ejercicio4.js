const datos = [
    { nombre: "Video1", formato: "mp4", tamañoGB: 7, fecha: "2023-03-15" },
    { nombre: "Video2", formato: "avi", tamañoGB: 3, fecha: "2023-02-20" },
    { nombre: "VideoAnimacion", formato: "mkv", tamañoGB: 5, fecha: "2023-03-10" },
    { nombre: "Tutorial", formato: "mp4", tamañoGB: 2, fecha: "2023-04-02" },
    { nombre: "Documental", formato: "mkv", tamañoGB: 9, fecha: "2023-01-28" },
];



const fechaLimite = new Date("2023-03-01");
const filtrados = datos.filter(({ fecha }) => new Date(fecha) > fechaLimite);
console.log("Filtrados:", filtrados);


const total = datos.reduce((suma, { tamañoGB }) => suma + tamañoGB, 0);
console.log("Total tamaño GB:", total);


const promedio = total / datos.length;
console.log("Promedio tamaño GB:", promedio);


const ordenados = [...datos].sort((a, b) => b.tamañoGB - a.tamañoGB);

console.log({ filtrados, total, promedio, ordenados });

console.log("Original:", datos);