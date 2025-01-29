const area = document.querySelector('.container');
const cepillo = document.querySelector('.cepillo');
const gato = document.querySelector('.gato');

let cepillando = false;

// Guardar la posición original del cepillo
const posicionOriginal = {
    parent: cepillo.parentElement, // Guarda el contenedor original
    nextSibling: cepillo.nextSibling // Guarda el siguiente nodo hermano
};

// Hacer el cepillo arrastrable
cepillo.draggable = true;

cepillo.addEventListener('dragstart', function (e) {
    e.target.classList.add("arrastrando");
});

// Cuando el cepillo está sobre el gato
gato.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log('Cepillo sobre el gato');
    cepillando = true;
});

// Cuando el cepillo se sale del gato sin soltar el mouse
gato.addEventListener('dragleave', () => {
    console.log('Cepillo salió del gato');
    cepillando = false;
});

// Si sueltas el cepillo dentro del gato
gato.addEventListener('drop', (e) => {
    e.preventDefault();
    console.log('Cepillo soltado sobre el gato');
    cepillando = true; // Sigue cepillando porque está sobre el gato
});

// Cuando el usuario suelta el cepillo en cualquier parte
cepillo.addEventListener('dragend', function (e) {
    console.log('Cepillo soltado');
    
    // Si el cepillo no está sobre el gato, restablecer su posición
    if (!cepillando) {
        posicionOriginal.parent.insertBefore(cepillo, posicionOriginal.nextSibling);
    }

    cepillando = false;
    cepillo.classList.remove("arrastrando");
});