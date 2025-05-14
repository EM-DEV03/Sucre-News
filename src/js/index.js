window.addEventListener('DOMContentLoaded', function () {
    const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    const main = document.querySelector('main');

    noticias.forEach(noticia => {
        const div = document.createElement('div');
        div.classList.add('news-card', 'mb-4', 'p-3', 'border', 'rounded');
        div.setAttribute('data-id', noticia.id);

        div.innerHTML = `
            <p class="text-muted small">CIUDADANO</p>
            <h5>${noticia.titulo}</h5>
            <p class="text-muted small">${noticia.autor} - ${noticia.fecha}</p>
            <img src="${noticia.imagen}" class="img-fluid mb-2 rounded" alt="Imagen noticia" style="max-width: 100%; height: auto; max-height: 250px;">
            <p>${noticia.descripcion}</p>
            <button class="btn btn-danger btn-sm eliminar-noticia" data-id="${noticia.id}">
                <i class="bi bi-trash3"></i> Eliminar
            </button>
        `;

        main.insertBefore(div, main.querySelector('.add-news'));
    });

    main.addEventListener('click', function (e) {
        if (e.target.classList.contains('eliminar-noticia') || e.target.closest('.eliminar-noticia')) {
            const btn = e.target.closest('.eliminar-noticia');
            const id = parseInt(btn.getAttribute('data-id'));

            if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

            let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
            noticias = noticias.filter(n => n.id !== id);
            localStorage.setItem('noticias', JSON.stringify(noticias));

            const noticiaDiv = document.querySelector(`div[data-id="${id}"]`);
            if (noticiaDiv) {
                noticiaDiv.remove();
            }
        }
    });

    const form = document.querySelector('#formulario');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const titulo = document.querySelector('#titulo').value;
        const descripcion = document.querySelector('#descripcion').value;
        const imagen = document.querySelector('#imagen').value;
        const autor = document.querySelector('#autor').value;
        const fecha = new Date().toLocaleDateString();

        const nuevaNoticia = {
            id: Date.now(),
            titulo,
            descripcion,
            imagen,
            autor,
            fecha
        };

        noticias.push(nuevaNoticia);
        localStorage.setItem('noticias', JSON.stringify(noticias));

        const div = document.createElement('div');
        div.classList.add('news-card', 'mb-4', 'p-3', 'border', 'rounded');
        div.setAttribute('data-id', nuevaNoticia.id);

        div.innerHTML = `
            <p class="text-muted small">CIUDADANO</p>
            <h5>${nuevaNoticia.titulo}</h5>
            <p class="text-muted small">${nuevaNoticia.autor} - ${nuevaNoticia.fecha}</p>
            <img src="${nuevaNoticia.imagen}" class="img-fluid mb-2 rounded" alt="Imagen noticia" style="max-width: 100%; height: auto; max-height: 250px;">
            <p>${nuevaNoticia.descripcion}</p>
            <button class="btn btn-danger btn-sm eliminar-noticia" data-id="${nuevaNoticia.id}">
                <i class="bi bi-trash3"></i> Eliminar
            </button>
        `;

        main.insertBefore(div, main.querySelector('.add-news'));

        form.reset();
    });
});
