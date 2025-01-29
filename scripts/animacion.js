console.log('asddsadas');

const cepillo = document.querySelector('.cepillo');
const gato = document.querySelector('.gato');

cepillo.style.height = "50px";
cepillo.style.width = "50px";
cepillo.style.backgroundColor = "blue";

gato.style.height = "20px";
gato.style.width = "20px";
gato.style.backgroundColor = "black";
gato.style.top = "500px";
gato.style.left = "500px";


cepillo.addEventListener('click', function (e) {
    startAnimation();
});


function startAnimation() {
    // gato.src = "../assets/img/pusheen.png";

    let brushMove = 0;
    let catMove = 0;
    let direction = 1;

    const animation = setInterval(() => {
        brushMove -= 2;
        catMove += direction * 2;
        if (catMove > 10 || catMove < -10) direction *= -1;

        cepillo.style.transform = `translateX(${brushMove}px)`;
        gato.style.transform = `translateX(-50%) translateY(${catMove}px)`;
    }, 50);

    setTimeout(() => {
        clearInterval(animation);
        resetGame();
    }, 2000);
}

function resetGame() {
    // gato.src = "../assets/img/pusheen_de_pie.png";
    cepillo.style.left = "30%";
    cepillo.style.top = "50px";
    cepillo.style.transform = "none";
    gato.style.transform = "translateX(-50%)";
}