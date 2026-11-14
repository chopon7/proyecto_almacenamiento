# Notas: contenido para comunidad.html

Recordatorio de qué poner en `pages/comunidad.html` y páginas relacionadas.

## Reparto de páginas

- `pages/informacion.html` ("Sobre nosotros"): información del proyecto (puntos 1 a 5).
- `pages/comunidad.html`: contenido de comunidad (roadmap, cambios, ideas, FAQ).
- Footer: enlaces a contacto, FAQ, aviso de privacidad y términos.

## Información del proyecto (obligatorio)

- [ ] 1. Qué es Temu Drive y por qué existe: una frase clara como `<h1>` y un párrafo corto. Sustituye "Texto inicial".
- [ ] 2. Historia: nació en Programación Web (UABCS), con una línea de tiempo de lo ya hecho.
- [ ] 3. Equipo: tarjeta por persona con nombre, rol y GitHub.
- [ ] 4. Estado actual: en desarrollo, qué funciona hoy y qué no.
- [ ] 5. Contacto: correo o formulario, y enlace al repositorio.

## Contenido de comunidad (opcional)

- [ ] Roadmap: Hecho / En progreso / Planeado.
- [ ] Changelog: notas cortas por actualización, la más nueva arriba.
- [ ] Ideas y reportes: formulario o enlace a GitHub Issues.
- [ ] Cómo contribuir: clonar el repositorio y enviar cambios.
- [ ] FAQ: límites de almacenamiento, tipos de archivo, qué pasa con los archivos si el proyecto cierra.
- [ ] Tecnologías usadas: HTML, CSS, JavaScript y el backend cuando se elija.

## Si el sitio entra en operación real

- [ ] Aviso de privacidad (LFPDPPP, vigente desde el 21 de marzo de 2025): quién es el responsable y su domicilio, qué datos se recogen y para qué. Debe estar en un lugar visible. Leer el texto oficial antes de publicar: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- [ ] Términos y condiciones: el formulario de registro ya tiene la casilla, falta la página.
- [ ] Nombre: "Temu" es una marca registrada de otra empresa. Cambiarlo antes de hacerlo público.

## Pendientes relacionados en el código

- [ ] `comunidad.html:97` carga `../index.js`; debe ser `../js/index.js`.
- [ ] Imágenes del footer en `comunidad.html`: usar `../assets/...`.
- [ ] Favicon en `comunidad.html` e `informacion.html`: usar `../assets/...`.
- [ ] `pages/soporte.html` no existe y está enlazada en todos los headers.
- [ ] Convertir "Contact us", "Q&A" y "Service terms" del footer en enlaces.
