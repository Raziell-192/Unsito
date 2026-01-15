function loadComponents() {
    // Cargar Header
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveLink(); // Marcar link activo
        });

    // Cargar Footer
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Función para marcar el enlace activo
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'Principal.html';
    const links = document.querySelectorAll('.nav-menu a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadComponents);


