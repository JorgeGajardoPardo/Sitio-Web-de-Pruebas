document.addEventListener("DOMContentLoaded", () => {
  /* Loader */
  const loader = document.getElementById("loader");
  const content = document.getElementById("page-content");
  if (loader && content) {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
    }, 800);
  }

  /* Menú responsive */
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      menuBtn.classList.toggle('active');
    });
  }

  /* Carrusel ping-pong (galería) */
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.gallery-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  let index = 0;
  let direction = 1;

  function updateCarousel() {
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (index > 0) {
        index--;
        direction = -1;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (index < items.length - 1) {
        index++;
        direction = 1;
        updateCarousel();
      }
    });
  }

  /* Autoplay ping-pong */
  let autoplay = setInterval(() => {
    if (direction === 1) {
      if (index < items.length - 1) {
        index++;
      } else {
        direction = -1;
        index--;
      }
    } else {
      if (index > 0) {
        index--;
      } else {
        direction = 1;
        index++;
      }
    }
    updateCarousel();
  }, 3000);

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        if (direction === 1) {
          if (index < items.length - 1) {
            index++;
          } else {
            direction = -1;
            index--;
          }
        } else {
          if (index > 0) {
            index--;
          } else {
            direction = 1;
            index++;
          }
        }
        updateCarousel();
      }, 3000);
    });
  }

  /* Lightbox */
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('#lightbox .close');
  const prevLightbox = document.querySelector('#lightbox #prev');
  const nextLightbox = document.querySelector('#lightbox #next');

  let currentIndex = 0;

  function showImage() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.remove('hidden');
  }

  galleryImages.forEach((img, i) => {
    img.addEventListener('click', () => {
      currentIndex = i;
      showImage();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
  }

  if (prevLightbox && nextLightbox) {
    prevLightbox.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage();
    });

    nextLightbox.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage();
    });
  }

  /* Formulario de contacto */
  const contactToggle = document.querySelector(".contact-toggle");
  const contactForm = document.querySelector(".contact-form");
  if (contactToggle && contactForm) {
    contactToggle.addEventListener("click", () => {
      contactForm.style.display = (contactForm.style.display === "block") ? "none" : "block";
    });
  }

  /* Accesibilidad: tamaño de fuente */
  let fontSize = 16; 
  const increaseFont = document.getElementById('increaseFont');
  const decreaseFont = document.getElementById('decreaseFont');
  if (increaseFont) {
    increaseFont.addEventListener('click', () => {
      fontSize += 2;
      document.documentElement.style.fontSize = fontSize + 'px'; 
    });
  }
  if (decreaseFont) {
    decreaseFont.addEventListener('click', () => {
      fontSize = Math.max(12, fontSize - 2);
      document.documentElement.style.fontSize = fontSize + 'px';
    });
  }

  /* Accesibilidad: modo oscuro */
  const toggleTheme = document.getElementById('toggleTheme');
  if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode'); 
    });
  }

  /* Animaciones fade-in */
  const fadeElements = document.querySelectorAll(".fade-in");
  const sobreTitulo = document.querySelector("#sobre-nosotros h2");
  const sobreParrafos = document.querySelectorAll("#sobre-nosotros p");

  if (sobreTitulo) {
    sobreTitulo.classList.add("visible");
  }

  if (sobreParrafos.length > 0) {
    setTimeout(() => {
      sobreParrafos[0].classList.add("visible");
    }, 2500);
  }

  function checkVisibility() {
    fadeElements.forEach(el => {
      if (el === sobreTitulo || el === sobreParrafos[0]) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);

  /* Procesos carrusel 3D mejorado */
  const procesosCarousel = document.querySelector('.procesos-carousel');
  const procesosItems = document.querySelectorAll('.procesos-item');
  const procesosPrevBtn = document.querySelector('#procesos .prev');
  const procesosNextBtn = document.querySelector('#procesos .next');

  let angle = 0;
  const step = 360 / procesosItems.length;
  const radius = 350; // distancia al centro

  // Posicionar cada item en círculo 3D
  procesosItems.forEach((item, i) => {
    const itemAngle = step * i;
    item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
  });

  function rotateCarousel(direction) {
    angle += step * direction;
    procesosCarousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
  }

  if (procesosPrevBtn && procesosNextBtn) {
    procesosPrevBtn.addEventListener('click', () => rotateCarousel(1));
    procesosNextBtn.addEventListener('click', () => rotateCarousel(-1));
  }

  // Autoplay opcional (cada 7 segundos)
  setInterval(() => rotateCarousel(-1), 7000);
});
