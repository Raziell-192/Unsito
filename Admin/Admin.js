// Admin.js - VERSIÓN FINAL QUE FUNCIONA

// 1. Variable global para controlar Especiales.html
let paginaEspeciales = null;

// 2. Buscar y conectar con Especiales.html al cargar
window.addEventListener('load', function() {
    conectarConEspeciales();
    
    // Ocultar todas las secciones menos la primera
    document.querySelectorAll('.form-section').forEach((sec, index) => {
        if (index !== 0) {
            sec.style.display = 'none';
        }
    });
    
    // Ocultar mensajes de éxito
    document.querySelectorAll('.success-message').forEach(msg => {
        msg.style.display = 'none';
    });
    
    console.log('✅ Admin.js listo');
});

// 3. Función para conectar con Especiales.html
function conectarConEspeciales() {
    // Intentar encontrar Especiales.html abierta
    try {
        // Buscar en todas las ventanas/tabs abiertas
        if (window.opener && !window.opener.closed) {
            paginaEspeciales = window.opener;
            console.log('🔗 Conectado a Especiales.html');
        }
    } catch(e) {
        console.log('⚠️ Especiales.html no está abierta en otra pestaña');
    }
}

// 4. Manejo de pestañas
function showSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.form-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Quitar active de botones
    document.querySelectorAll('.nav-tabs button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(`${section}-section`).style.display = 'block';
    
    // Activar botón
    event.target.classList.add('active');
}

// 5. Vista previa para memes
document.getElementById('memeImagen').addEventListener('input', function() {
    const preview = document.getElementById('memePreview');
    if (this.value) {
        preview.innerHTML = `<img src="${this.value}" style="max-width: 100%; border-radius: 5px;">`;
    } else {
        preview.innerHTML = 'La imagen aparecerá aquí...';
    }
});

// 6. CONFIGURAR TODOS LOS FORMULARIOS
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formId = this.id;
            const tipo = formId.replace('Form', '');
            
            // Recoger datos
            const datos = {};
            this.querySelectorAll('input, textarea, select').forEach(input => {
                if (input.value.trim() !== '') {
                    datos[input.id] = input.value;
                }
            });
            
            // Mostrar mensaje de éxito
            const successMsg = document.getElementById(`${tipo}Success`);
            if (successMsg) {
                successMsg.style.display = 'block';
            }
            
            // ACTUALIZAR ESPECIALES.HTML INMEDIATAMENTE
            actualizarEspeciales(tipo, datos);
            
            // Limpiar después de 2 segundos
            setTimeout(() => {
                this.reset();
                if (successMsg) successMsg.style.display = 'none';
                
                if (tipo === 'meme') {
                    document.getElementById('memePreview').innerHTML = 'La imagen aparecerá aquí...';
                }
            }, 2000);
        });
    });
});

// 7. FUNCIÓN PRINCIPAL: Actualizar Especiales.html con innerHTML
function actualizarEspeciales(tipo, datos) {
    console.log(`🔄 Actualizando ${tipo} en Especiales.html...`);
    
    // Si no está conectada, intentar reconectar
    if (!paginaEspeciales || paginaEspeciales.closed) {
        conectarConEspeciales();
    }
    
    // Verificar que tenemos datos y conexión
    if (Object.keys(datos).length === 0) {
        console.log('❌ No hay datos para actualizar');
        return;
    }
    
    if (!paginaEspeciales || paginaEspeciales.closed) {
        console.log('⚠️ Abre Especiales.html en otra pestaña primero');
        mostrarAvisoAbrirEspeciales();
        return;
    }
    
    try {
        // Obtener el documento de Especiales.html
        const doc = paginaEspeciales.document;
        
        // ACTUALIZAR LA SECCIÓN CORRESPONDIENTE USANDO innerHTML
        switch(tipo) {
            case 'bienvenida':
                const bienvenidaDiv = doc.getElementById('bienvenida');
                if (bienvenidaDiv) {
                    bienvenidaDiv.innerHTML = `<p><strong>${datos.bienvenidaTexto}</strong></p>`;
                    console.log('✅ Bienvenida actualizada');
                }
                break;
                
            case 'meme':
                const memesDiv = doc.getElementById('memes');
                if (memesDiv) {
                    memesDiv.innerHTML = `
                        <div class="meme-item">
                            <img src="${datos.memeImagen}" alt="${datos.memeTitulo}" style="max-width: 100%; border-radius: 8px;">
                            <p class="meme-texto"><strong>${datos.memeTitulo}</strong></p>
                            ${datos.memeDescripcion ? `<p>${datos.memeDescripcion}</p>` : ''}
                            ${datos.memeCategoria ? `<p><small>Categoría: ${datos.memeCategoria}</small></p>` : ''}
                        </div>
                        <div style="text-align: center; margin-top: 2rem;">
                            <a href="Memes/memes.html" class="cta-button">Ver Todos los Memes</a>
                        </div>
                    `;
                    console.log('✅ Meme actualizado');
                }
                break;
                
            case 'trivia':
                const triviaDiv = doc.getElementById('trivia');
                if (triviaDiv) {
                    triviaDiv.innerHTML = `
                        <div class="trivia-item">
                            <h3>${datos.triviaPregunta}</h3>
                            <div class="opciones-trivia">
                                <p><strong>A)</strong> ${datos.triviaOpcion1}</p>
                                <p><strong>B)</strong> ${datos.triviaOpcion2}</p>
                                <p><strong>C)</strong> ${datos.triviaOpcion3}</p>
                                <p><strong>D)</strong> ${datos.triviaOpcion4}</p>
                            </div>
                            ${datos.triviaDificultad ? `<p><small>Dificultad: ${datos.triviaDificultad}</small></p>` : ''}
                        </div>
                    `;
                    console.log('✅ Trivia actualizada');
                }
                break;
                
            case 'encuesta':
                const encuestasDiv = doc.getElementById('encuestas');
                if (encuestasDiv) {
                    encuestasDiv.innerHTML = `
                        <div class="encuesta-item">
                            <h3>${datos.encuestaTitulo}</h3>
                            ${datos.encuestaDescripcion ? `<p>${datos.encuestaDescripcion}</p>` : ''}
                            <div class="opciones-encuesta">
                                <p><strong>1.</strong> ${datos.encuestaOpcion1}</p>
                                <p><strong>2.</strong> ${datos.encuestaOpcion2}</p>
                                <p><strong>3.</strong> ${datos.encuestaOpcion3}</p>
                                <p><strong>4.</strong> ${datos.encuestaOpcion4}</p>
                            </div>
                            ${datos.encuestaDuracion ? `<p><small>Encuesta activa por ${datos.encuestaDuracion} días</small></p>` : ''}
                        </div>
                    `;
                    console.log('✅ Encuesta actualizada');
                }
                break;
                
            case 'dato':
                const datoDiv = doc.getElementById('dato-curioso');
                if (datoDiv) {
                    datoDiv.innerHTML = `
                        <div class="dato-item">
                            <h3>${datos.datoTitulo}</h3>
                            <p>${datos.datoContenido}</p>
                            ${datos.datoImagen ? `<img src="${datos.datoImagen}" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">` : ''}
                            ${datos.datoCategoria ? `<p><small>Categoría: ${datos.datoCategoria}</small></p>` : ''}
                            ${datos.datoFuente ? `<p><small>Fuente: ${datos.datoFuente}</small></p>` : ''}
                        </div>
                    `;
                    console.log('✅ Dato curioso actualizado');
                }
                break;
                
            case 'comparacion':
                const antesAhoraDiv = doc.getElementById('antes-ahora');
                if (antesAhoraDiv) {
                    antesAhoraDiv.innerHTML = `
                        <div class="comparacion-item">
                            <h3>${datos.comparacionTitulo}</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                                <div style="flex: 1; min-width: 250px;">
                                    <h4>Antes</h4>
                                    <img src="${datos.antesImagen}" style="width: 100%; border-radius: 8px;">
                                </div>
                                <div style="flex: 1; min-width: 250px;">
                                    <h4>Ahora</h4>
                                    <img src="${datos.despuesImagen}" style="width: 100%; border-radius: 8px;">
                                </div>
                            </div>
                        </div>
                    `;
                    console.log('✅ Comparación actualizada');
                }
                break;
                
            case 'random':
                const randomDiv = doc.getElementById('random-questions');
                if (randomDiv) {
                    randomDiv.innerHTML = `
                        <div class="random-item">
                            <h3>Pregunta del día</h3>
                            <p><strong>${datos.randomPregunta}</strong></p>
                            <p><strong>Respuesta:</strong> ${datos.randomRespuesta}</p>
                        </div>
                    `;
                    console.log('✅ Pregunta random actualizada');
                }
                break;
        }
        
        // Mostrar confirmación
        mostrarConfirmacionExito(tipo);
        
    } catch(error) {
        console.error('❌ Error al actualizar Especiales.html:', error);
        mostrarErrorConexion();
    }
}

// 8. Mostrar confirmación de éxito
function mostrarConfirmacionExito(tipo) {
    const confirmacion = document.createElement('div');
    confirmacion.id = 'confirmacion-actualizacion';
    confirmacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        max-width: 300px;
    `;
    
    confirmacion.innerHTML = `
        <h4 style="margin: 0 0 10px 0;">✅ ACTUALIZADO</h4>
        <p style="margin: 0;">${tipo.toUpperCase()} actualizado en Especiales.html</p>
        <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.9;">
            Revisa la otra pestaña
        </p>
    `;
    
    document.body.appendChild(confirmacion);
    
    setTimeout(() => {
        confirmacion.style.opacity = '0';
        confirmacion.style.transition = 'opacity 1s';
        setTimeout(() => {
            if (confirmacion.parentNode) {
                confirmacion.parentNode.removeChild(confirmacion);
            }
        }, 1000);
    }, 3000);
}

// 9. Mostrar aviso si Especiales.html no está abierta
function mostrarAvisoAbrirEspeciales() {
    const aviso = document.createElement('div');
    aviso.id = 'aviso-especiales';
    aviso.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffc107;
        color: #856404;
        padding: 20px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 400px;
        text-align: center;
        border: 2px solid #856404;
    `;
    
    aviso.innerHTML = `
        <h3 style="margin-top: 0;">⚠️ ATENCIÓN</h3>
        <p>Para ver los cambios en tiempo real:</p>
        <p><strong>1.</strong> Abre <strong>Especiales.html</strong> en otra pestaña</p>
        <p><strong>2.</strong> No la cierres</p>
        <p><strong>3.</strong> Vuelve a guardar aquí</p>
        <button onclick="cerrarAviso()" style="
            background: #856404;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            margin-top: 15px;
            cursor: pointer;
        ">
            Entendido
        </button>
    `;
    
    document.body.appendChild(aviso);
}

function cerrarAviso() {
    const aviso = document.getElementById('aviso-especiales');
    if (aviso && aviso.parentNode) {
        aviso.parentNode.removeChild(aviso);
    }
}

// 10. Mostrar error de conexión
function mostrarErrorConexion() {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc3545;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 10000;
    `;
    
    errorDiv.textContent = '❌ Error al conectar con Especiales.html';
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}