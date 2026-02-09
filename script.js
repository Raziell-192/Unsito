// Calcula la ruta
function getBasePath() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    // Quita el nombre del archivo
    parts.pop();

    // Calcula cuántos niveles hay desde Proyecto
    let levels = parts.length - 1;

    return '../'.repeat(levels);
}
// Código que vimos en clase para cargar header/footer referenciados
function loadComponents() {
    const basePath = getBasePath();

    fetch(basePath + 'header.html')
        .then(res => {
            if (!res.ok) throw new Error('No se pudo cargar el header');
            return res.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveLink(basePath);
        })
        .catch(err => console.error(err));

    fetch(basePath + 'footer.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

function setActiveLink(basePath) {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-menu a');

    links.forEach(link => {
        const href = link.getAttribute('href').replace(basePath, '');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadComponents);
