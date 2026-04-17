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
  const menuBtn = document.getElementById("menuToggle");
  const navLinksContainer = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll("#navLinks li a");

  if (menuBtn && navLinksContainer) {
    // abrir/cerrar menú
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navLinksContainer.classList.toggle("show");
    });

    // cerrar menú y scroll suave al hacer clic en enlace
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(targetId);

          // cerrar menú
          menuBtn.classList.remove("active");
          navLinksContainer.classList.remove("show");

          // scroll suave hacia la sección
          if (target) {
            const navHeight = document.querySelector(".navbar").offsetHeight;
            const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      });
    });
  }

  /* Navbar aparece al subir */
  let lastScrollTop = 0;
  const nav = document.querySelector(".navbar"); 
  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < lastScrollTop) nav.style.top = "0";
    else nav.style.top = "-100px";
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

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
      if (index > 0) { index--; direction = -1; updateCarousel(); }
    });
    nextBtn.addEventListener('click', () => {
      if (index < items.length - 1) { index++; direction = 1; updateCarousel(); }
    });
  }

  let autoplay = setInterval(() => {
    if (direction === 1) {
      if (index < items.length - 1) index++; else { direction = -1; index--; }
    } else {
      if (index > 0) index--; else { direction = 1; index++; }
    }
    updateCarousel();
  }, 3000);

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        if (direction === 1) {
          if (index < items.length - 1) index++; else { direction = -1; index--; }
        } else {
          if (index > 0) index--; else { direction = 1; index++; }
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

  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
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
  function checkVisibility() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", checkVisibility);
  checkVisibility();

  /* Procesos carrusel 3D */
  const procesosCarousel = document.querySelector('.procesos-carousel');
  const procesosItems = document.querySelectorAll('.procesos-item');
  const procesosPrevBtn = document.querySelector('#procesos .prev');
  const procesosNextBtn = document.querySelector('#procesos .next');

  let angle = 0;
  const step = 360 / procesosItems.length;
  const radius = 350;

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

  setInterval(() => rotateCarousel(-1), 7000);
});
