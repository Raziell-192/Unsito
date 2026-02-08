
        // let slideActual = 0;
        // const slides = document.querySelectorAll('#miCarrusel .slide');
        // const indicadores = document.querySelectorAll('#miCarrusel .carrusel-controles span');
        
        // function mostrarSlide(n) {
        //     slideActual = n;
        //     document.querySelector('#miCarrusel .slides').style.transform = `translateX(-${slideActual * 33.333}%)`;
        //     indicadores.forEach((ind, i) => ind.classList.toggle('activo', i === slideActual));
        // }
        
        // function cambiarSlide(direccion) {
        //     let nuevo = (slideActual + direccion + slides.length) % slides.length;
        //     mostrarSlide(nuevo);
        // }
        
        // Auto-avance opcional (descomenta si lo quieres)
        // setInterval(() => cambiarSlide(1), 5000);

        let slideActual = 0;
        let autoAvanceActivo = true;
        let intervaloAutoAvance;
        const slides = document.querySelectorAll('#miCarrusel .slide');
        const indicadores = document.querySelectorAll('#miCarrusel .carrusel-controles span');
        const btnPause = document.getElementById('btnPause');
        
        // Calcular porcentaje de desplazamiento (100% / número de slides)
        const porcentajePorSlide = 100 / slides.length;
        
        // Función para mostrar un slide específico
        function mostrarSlide(n) {
            slideActual = n;
            const desplazamiento = -(slideActual * porcentajePorSlide);
            document.querySelector('#miCarrusel .slides').style.transform = `translateX(${desplazamiento}%)`;
            
            // Actualizar indicadores
            indicadores.forEach((ind, i) => {
                ind.classList.toggle('activo', i === slideActual);
            });
            
            // Reiniciar el auto-avance al cambiar manualmente
            reiniciarAutoAvance();
        }
        
        // Función para cambiar slide (adelante o atrás)
        function cambiarSlide(direccion) {
            let nuevo = (slideActual + direccion + slides.length) % slides.length;
            mostrarSlide(nuevo);
        }
        
        // Función para auto-avance
        function iniciarAutoAvance() {
            if (!autoAvanceActivo) return;
            
            intervaloAutoAvance = setInterval(() => {
                let nuevo = (slideActual + 1) % slides.length;
                mostrarSlide(nuevo);
            }, 4000); // Cambia cada 4 segundos
        }
        
        // Función para pausar/reanudar
        function toggleAutoAvance() {
            autoAvanceActivo = !autoAvanceActivo;
            
            if (autoAvanceActivo) {
                iniciarAutoAvance();
                btnPause.innerHTML = '❚❚';
                btnPause.title = 'Pausar carrusel';
            } else {
                clearInterval(intervaloAutoAvance);
                btnPause.innerHTML = '▶';
                btnPause.title = 'Reanudar carrusel';
            }
        }
        
        // Reiniciar auto-avance (cuando el usuario interactúa)
        function reiniciarAutoAvance() {
            if (autoAvanceActivo) {
                clearInterval(intervaloAutoAvance);
                iniciarAutoAvance();
            }
        }
        
        // Pausar auto-avance al pasar el mouse (solo desktop)
        const carrusel = document.getElementById('miCarrusel');
        if (window.innerWidth >= 768) {
            carrusel.addEventListener('mouseenter', () => {
                if (autoAvanceActivo) {
                    clearInterval(intervaloAutoAvance);
                }
            });
            
            carrusel.addEventListener('mouseleave', () => {
                if (autoAvanceActivo) {
                    iniciarAutoAvance();
                }
            });
        }
        
        // Inicializar
        mostrarSlide(0);
        iniciarAutoAvance();
        
        // Event listeners
        btnPause.addEventListener('click', toggleAutoAvance);
        
        // Navegación con teclado (opcional)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') cambiarSlide(-1);
            if (e.key === 'ArrowRight') cambiarSlide(1);
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                toggleAutoAvance();
            }
        });
