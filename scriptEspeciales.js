// Bienvenida
let bienvenida = localStorage.getItem("bienvenida");

if (bienvenida) {
    document.getElementById("bienvenida").innerHTML = `
        <p>${bienvenida}</p>
    `;
}

// Memes
let meme = localStorage.getItem("meme");

if (meme) {
    meme = JSON.parse(meme);

    document.getElementById("memes").innerHTML = `
        <div class="meme-item">
            <img src="${meme.imagen}" alt="Meme UNSIS">
            <p class="meme-texto"><strong>${meme.titulo}</strong></p>
            <p>${meme.descripcion}</p>
        </div>
    `;
}

// Trivia
let trivia = localStorage.getItem("trivia");

if (trivia) {
    trivia = JSON.parse(trivia);

    document.getElementById("trivia").innerHTML = `
        <p><strong>${trivia.pregunta}</strong></p>
        <ul>
            <li>${trivia.correcta}</li>
            <li>${trivia.opcion2}</li>
            <li>${trivia.opcion3}</li>
            <li>${trivia.opcion4}</li>
        </ul>
        <p><em>Dificultad: ${trivia.dificultad}</em></p>
    `;
}

// Encuestas
let encuesta = localStorage.getItem("encuesta");

if (encuesta) {
    encuesta = JSON.parse(encuesta);

    document.getElementById("encuestas").innerHTML = `
        <p><strong>${encuesta.titulo}</strong></p>
        <p>${encuesta.descripcion}</p>
        <ul>
            <li>${encuesta.opcion1}</li>
            <li>${encuesta.opcion2}</li>
            <li>${encuesta.opcion3}</li>
            <li>${encuesta.opcion4}</li>
        </ul>
        <p><em>Duración: ${encuesta.duracion} días</em></p>
    `;
}

// Datos curiosos
let dato = localStorage.getItem("datoCurioso");

if (dato) {
    dato = JSON.parse(dato);

    document.getElementById("dato-curioso").innerHTML = `
        <h3>${dato.titulo}</h3>
        <p>${dato.contenido}</p>
        ${dato.imagen ? `<img src="${dato.imagen}" alt="Dato curioso">` : ""}
        ${dato.fuente ? `<p><em>Fuente: ${dato.fuente}</em></p>` : ""}
    `;
}

// Antes vs ahora
let antesAhora = localStorage.getItem("antesAhora");

if (antesAhora) {
    antesAhora = JSON.parse(antesAhora);

    document.getElementById("antes-ahora").innerHTML = `
        <h3>${antesAhora.titulo}</h3>
        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <div>
                <p><strong>Antes</strong></p>
                <img src="${antesAhora.antes}" alt="Antes">
            </div>
            <div>
                <p><strong>Después</strong></p>
                <img src="${antesAhora.despues}" alt="Después">
            </div>
        </div>
    `;
}

// Preguntas random
let random = localStorage.getItem("randomPregunta");

if (random) {
    random = JSON.parse(random);

    document.getElementById("random-questions").innerHTML = `
        <p><strong>${random.pregunta}</strong></p>
        <p><em>${random.respuesta}</em></p>
    `;
}
