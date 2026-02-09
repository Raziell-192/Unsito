//Bienvenida
document.getElementById("bienvenidaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let texto = document.getElementById("bienvenidaTexto").value;

    localStorage.setItem("bienvenida", texto);

    document.getElementById("memeSuccess").style.display = "block";
});

// Memes
document.getElementById("memeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let meme = {
        titulo: document.getElementById("memeTitulo").value,
        imagen: document.getElementById("memeImagen").value,
        descripcion: document.getElementById("memeDescripcion").value,
        categoria: document.getElementById("memeCategoria").value
    };

    localStorage.setItem("meme", JSON.stringify(meme));

    document.getElementById("memeSuccess").style.display = "block";
});

// Trivia
document.getElementById("triviaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let trivia = {
        pregunta: document.getElementById("triviaPregunta").value,
        correcta: document.getElementById("triviaOpcion1").value,
        opcion2: document.getElementById("triviaOpcion2").value,
        opcion3: document.getElementById("triviaOpcion3").value,
        opcion4: document.getElementById("triviaOpcion4").value,
        dificultad: document.getElementById("triviaDificultad").value,
        explicacion: document.getElementById("triviaExplicacion").value
    };

    localStorage.setItem("trivia", JSON.stringify(trivia));

    document.getElementById("triviaSuccess").style.display = "block";
});

// Encuestas
document.getElementById("encuestaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let encuesta = {
        titulo: document.getElementById("encuestaTitulo").value,
        descripcion: document.getElementById("encuestaDescripcion").value,
        opcion1: document.getElementById("encuestaOpcion1").value,
        opcion2: document.getElementById("encuestaOpcion2").value,
        opcion3: document.getElementById("encuestaOpcion3").value,
        opcion4: document.getElementById("encuestaOpcion4").value,
        duracion: document.getElementById("encuestaDuracion").value
    };

    localStorage.setItem("encuesta", JSON.stringify(encuesta));

    document.getElementById("encuestaSuccess").style.display = "block";
});

// Dato curioso
document.getElementById("datoForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let dato = {
        titulo: document.getElementById("datoTitulo").value,
        contenido: document.getElementById("datoContenido").value,
        categoria: document.getElementById("datoCategoria").value,
        imagen: document.getElementById("datoImagen").value,
        fuente: document.getElementById("datoFuente").value
    };

    localStorage.setItem("datoCurioso", JSON.stringify(dato));

    document.getElementById("datoSuccess").style.display = "block";
});

// Antes vs ahora
document.getElementById("comparacionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let comparacion = {
        titulo: document.getElementById("comparacionTitulo").value,
        antes: document.getElementById("antesImagen").value,
        despues: document.getElementById("despuesImagen").value
    };

    localStorage.setItem("antesAhora", JSON.stringify(comparacion));

    document.getElementById("comparacionSuccess").style.display = "block";
});

// Preguntas random
document.getElementById("randomForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let random = {
        pregunta: document.getElementById("randomPregunta").value,
        respuesta: document.getElementById("randomRespuesta").value
    };

    localStorage.setItem("randomPregunta", JSON.stringify(random));

    document.getElementById("randomSuccess").style.display = "block";
});
