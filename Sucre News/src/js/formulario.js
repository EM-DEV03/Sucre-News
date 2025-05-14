function mostrarImagenPreview() {
    const fileInput = document.getElementById('imagen');
    const preview = document.getElementById('preview');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

document.getElementById('noticiaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('contenido').value.trim();
    const autor = document.getElementById('autor').value.trim() || 'Anónimo';
    const imagenInput = document.getElementById('imagen');
    const imagenFile = imagenInput.files[0];

    if (!titulo || !descripcion || !imagenFile) {
        alert("Por favor, completa todos los campos y sube una imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const nuevaNoticia = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            autor: autor,
            fecha: new Date().toLocaleDateString("es-CO"),
            imagen: reader.result
        };

        let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        noticias.unshift(nuevaNoticia);
        localStorage.setItem('noticias', JSON.stringify(noticias));

        mostrarMensajePublicado(() => {
            window.location.href = "index.html";
        });
    };

    reader.readAsDataURL(imagenFile);
});

function mostrarMensajePublicado(callback) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-publicado';
    mensaje.textContent = '¡Noticia publicada exitosamente!';
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
        if (typeof callback === 'function') callback();
    }, 2000);
}
