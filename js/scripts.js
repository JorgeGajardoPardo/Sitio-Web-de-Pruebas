document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("page-content");

  loader.classList.add("fade-out");
  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 800);
});

const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuBtn.classList.toggle('active');
});

const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('#lightbox .close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
  });
});

function showImage() {
  lightboxImg.src = galleryImages[currentIndex].src;
  lightbox.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});


document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
});

document.querySelector(".contact-toggle").addEventListener("click", function() {
  const form = document.querySelector(".contact-form");
  form.style.display = (form.style.display === "block") ? "none" : "block";
});


let fontSize = 16; 
document.getElementById('increaseFont').addEventListener('click', () => {
  fontSize += 2;
  document.documentElement.style.fontSize = fontSize + 'px'; 
});

document.getElementById('decreaseFont').addEventListener('click', () => {
  fontSize -= 2;
  document.documentElement.style.fontSize = fontSize + 'px';
});

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); 
});


document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los elementos con fade-in
  const fadeElements = document.querySelectorAll(".fade-in");

  // Caso especial: título y primer párrafo de "Sobre Nosotros"
  const sobreTitulo = document.querySelector("#sobre-nosotros h2");
  const sobreParrafos = document.querySelectorAll("#sobre-nosotros p");

  // Mostrar título inmediatamente
  if (sobreTitulo) {
    sobreTitulo.classList.add("visible");
  }

  // Mostrar primer párrafo con retraso de 2.5 segundos
  if (sobreParrafos.length > 0) {
    setTimeout(() => {
      sobreParrafos[0].classList.add("visible");
    }, 2500);
  }

  // Función para mostrar el resto de elementos al hacer scroll
  function checkVisibility() {
    fadeElements.forEach(el => {
      // Evita volver a animar el título y el primer párrafo
      if (el === sobreTitulo || el === sobreParrafos[0]) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  // Activar al hacer scroll
  window.addEventListener("scroll", checkVisibility);
 
});
