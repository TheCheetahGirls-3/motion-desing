const area = document.querySelector('.container');
const cepillo = document.getElementById('cepillo');
const gato = document.getElementById('gato');
const audio = document.getElementById('miau');

let animation = null;

// **Función para iniciar la animación**
function startAnimation() {
    let brushMove = 0;
    let catMove = 0;
    let direction = 1;
    let brushDirection = 1; // 1 = derecha, -1 = izquierda

    animation = setInterval(() => {
        // Movimiento del cepillo (izquierda ↔ derecha)
        brushMove += brushDirection * 5; // Cambia la dirección del cepillo
        if (brushMove > 20 || brushMove < -20) {
            brushDirection *= -1;
        }

        // Movimiento del gato (arriba ↕ abajo)
        catMove += direction * 2;
        if (catMove > 10 || catMove < -10) {
            direction *= -1;
        }

        // Aplicar los movimientos
        cepillo.style.transform = `translateX(${brushMove}px)`;
        gato.style.transform = `translateX(-50%) translateY(${catMove}px)`;
        
    }, 50);

    // **Detener la animación después de 3 segundos**
    setTimeout(() => {
        console.log("Tiempo de animación cumplido. Reiniciando...");
        clearInterval(animation);
        resetGame();
    }, 10000);
}

// **Función para detectar colisión**
function checkCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||  
        rect1.left > rect2.right ||  
        rect1.bottom < rect2.top ||  
        rect1.top > rect2.bottom     
    );
}

// **Función para colocar el cepillo encima del gato y moverlo de izquierda a derecha**
function positionBrushOnCat() {
    const gatoRect = gato.getBoundingClientRect();
    const cepilloRect = cepillo.getBoundingClientRect();

    // Calculamos el offset para centrar el cepillo horizontalmente y colocarlo justo encima
    const offsetX = (gatoRect.width - cepilloRect.width) / 2;
    const offsetY = cepilloRect.height -50; // Un poco más arriba del gato

    cepillo.style.position = "absolute";
    cepillo.style.left = `${gatoRect.left + offsetX}px`;
    cepillo.style.top = `${gatoRect.top + offsetY}px`;
}

// **Función para reiniciar la posición**
function resetGame() {
    cepillo.style.position = "static";
    cepillo.style.transform = "none";
    gato.style.transform = "translateX(-50%)";
}

// Guardar la posición original del cepillo
const posicionOriginal = {
    parent: cepillo.parentElement,
    nextSibling: cepillo.nextSibling
};

// Hacer el cepillo arrastrable
cepillo.draggable = true;

cepillo.addEventListener('dragstart', function (e) {
    e.target.classList.add("arrastrando");
});

// Cuando el cepillo está sobre el gato
gato.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Si sueltas el cepillo sobre el gato
gato.addEventListener('drop', (e) => {
    e.preventDefault();
    console.log('Cepillo soltado sobre el gato');

    // **Coloca el cepillo encima del gato**
    positionBrushOnCat();

    // **Inicia la animación**
    startAnimation();
    audio.play();
});

// Si el cepillo se suelta fuera del gato, vuelve a su posición original
cepillo.addEventListener('dragend', function (e) {
    console.log('Cepillo soltado');

    if (!checkCollision(cepillo, gato)) {
        posicionOriginal.parent.insertBefore(cepillo, posicionOriginal.parent);
        audio.pause();
        resetGame();
    }
});
