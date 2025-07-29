// ==== SWING LOGIC ====

function swingElement(el) {
  el.classList.add('swing');
  el.addEventListener('animationend', () => {
    el.classList.remove('swing');
  }, { once: true });
}

const wrapper1 = document.getElementById('wrapper1');
const wrapper2 = document.getElementById('wrapper2');

// Disparadores: scroll y clicks
window.addEventListener('scroll', () => {
  swingElement(wrapper1);
  swingElement(wrapper2);
});

document.querySelectorAll('a, .lampara').forEach(el => {
  el.addEventListener('click', () => {
    swingElement(wrapper1);
    swingElement(wrapper2);
  });
});


// ==== MOON CANVAS LOGIC ====

(function() {
  // 1) Crea y añade el canvas al body
  const canvas = document.createElement('canvas');
  canvas.id = 'moonCanvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // 2) Redimensiona y redibuja
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawMoon();
  }
  window.addEventListener('resize', resize);
  // Inicializa tamaño y dibuja
  resize();

  // 3) Función de dibujo
  function drawMoon() {
    const rMain = 40;            // radio de las lunas
    const offset = 20;           // solapamiento
    const margin = 16;           // margen al top/right

    // calcula centro de sombra
    const xShadow = canvas.width - margin - rMain;
    const yCenter = margin + rMain;

    // calcula centro de círculo iluminado (desplazado a la izquierda)
    const xLight = xShadow - offset;

    // limpia
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // dibuja parte iluminada
    ctx.beginPath();
    ctx.arc(xLight, yCenter, rMain, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC107';
    ctx.fill();

    // dibuja sombra
    ctx.beginPath();
    ctx.arc(xShadow, yCenter, rMain, 0, Math.PI * 2);
    ctx.fillStyle = '#3F51B5';
    ctx.fill();
  }
})();

// ==== GENERACIÓN DE ESTRELLAS ALEATORIAS ====

(function() {
  const STAR_COUNT = 100    // ajusta cuántas estrellas quieres
  const body = document.body;

  function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    // tamaño y opacidad aleatoria ligera
    const size = Math.random() * 9 + 6; // entre 1px y 3px
    star.style.width  = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
    // posición aleatoria dentro del viewport
    star.style.top  = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    body.appendChild(star);
  }

  function generateStars() {
    for (let i = 0; i < STAR_COUNT; i++) {
      createStar();
    }
  }

  // Solo generar una vez al cargar
  window.addEventListener('DOMContentLoaded', generateStars);
})();
(function() {
  const logo = document.getElementById('footerLogo');
  // Lista de imágenes entre las que alternar
  const imgs = [
    'images/l1.png',
    'images/l2.png'
  ];
  let idx = 0;

  logo.addEventListener('click', () => {
    // Cada click: alterna primero la imagen...
    idx = (idx + 1) % imgs.length;
    logo.src = imgs[idx];

    // ...y dispara la animación
    logo.classList.add('spin');
    // Remueve la clase al acabar para poder volver a girar tras 0.5s
    logo.addEventListener('animationend', function handler() {
      logo.classList.remove('spin');
      logo.removeEventListener('animationend', handler);
    }, { once: true });
  });
})();
