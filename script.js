// Loader: ocultar al cargar la página
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Carrusel automático con fade
let slides = document.querySelectorAll('.carousel .slide');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (idx === i) slide.classList.add("active");
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

// Cambia cada 5 segundos
setInterval(nextSlide, 5000);

// Formulario con Formspree y mensaje bonito
const form = document.querySelector('.contact-form');
const messageBox = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      messageBox.textContent = '✅ Gracias por contactarnos. Te responderemos pronto.';
      messageBox.className = 'success';
      form.reset();

      // Desvanecer el mensaje después de 5 segundos
      setTimeout(() => {
        messageBox.textContent = '';
        messageBox.className = '';
      }, 5000);

    } else {
      messageBox.textContent = '❌ Ocurrió un error. Intenta nuevamente.';
      messageBox.className = 'error';
    }
  } catch (error) {
    messageBox.textContent = '❌ Error de conexión. Intenta más tarde.';
    messageBox.className = 'error';
  }
});
