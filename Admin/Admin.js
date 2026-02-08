
        // Manejo de pestañas
        function showSection(section) {
            // Ocultar todas las secciones
            document.querySelectorAll('.form-section').forEach(sec => {
                sec.classList.remove('active-section');
                sec.style.display = 'none';
            });
            
            // Remover clase active de todos los botones
            document.querySelectorAll('.nav-tabs button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Mostrar sección seleccionada
            document.getElementById(`${section}-section`).style.display = 'block';
            document.getElementById(`${section}-section`).classList.add('active-section');
            
            // Activar botón correspondiente
            event.target.classList.add('active');
        }

        // Mostrar vista previa de imagen en memes
        document.getElementById('memeImagen').addEventListener('input', function() {
            const preview = document.getElementById('memePreview');
            if (this.value) {
                preview.innerHTML = `<img src="${this.value}" alt="Vista previa del meme" style="max-width: 100%; border-radius: 5px;">`;
            } else {
                preview.innerHTML = 'La imagen aparecerá aquí...';
            }
        });

        // Manejo de formularios (simulación de guardado)
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener ID del formulario
                const formId = this.id;
                const successId = formId.replace('Form', 'Success');
                
                // Mostrar mensaje de éxito
                const successMsg = document.getElementById(successId);
                successMsg.style.display = 'block';
                
                // Simular guardado en localStorage (en un caso real sería una petición AJAX)
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                // Guardar en localStorage según el tipo
                const tipo = formId.replace('Form', '');
                const key = `${tipo}_${Date.now()}`;
                localStorage.setItem(key, JSON.stringify(data));
                
                // Limpiar formulario después de 2 segundos
                setTimeout(() => {
                    this.reset();
                    successMsg.style.display = 'none';
                    
                    // Limpiar vista previa
                    if (formId === 'memeForm') {
                        document.getElementById('memePreview').innerHTML = 'La imagen aparecerá aquí...';
                    }
                }, 2000);
            });
        });

        // Cargar datos existentes al iniciar
        function cargarDatosExistentes() {
            // Esta función cargaría datos existentes si los hubiera
            console.log('Cargando datos existentes...');
        }
        
        // Inicializar
        window.onload = function() {
            // Mostrar solo la primera sección
            document.querySelectorAll('.form-section').forEach((sec, index) => {
                if (index !== 0) {
                    sec.style.display = 'none';
                }
            });
            
            cargarDatosExistentes();
        }


