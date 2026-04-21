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
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navLinksContainer.classList.toggle("show");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(targetId);
          menuBtn.classList.remove("active");
          navLinksContainer.classList.remove("show");
          if (target) {
            const navHeight = document.querySelector(".navbar").offsetHeight;
            const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      });
    });
  }

  /* Navbar*/
  let lastScrollTop = 0;
  const nav = document.querySelector(".navbar"); 
  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < lastScrollTop) nav.style.top = "0";
    else nav.style.top = "-100px";
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  /* Carrusel*/
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.gallery-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  let index = 0;
  let direction = 1;

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
    let delay = 0;
    fadeElements.forEach(el => {
      if (el === sobreTitulo || el === sobreParrafos[0]) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 100 && rect.bottom > 0;
      if (inView && !el.classList.contains("visible")) {
        setTimeout(() => {
          el.classList.add("visible");
        }, delay);
        delay += 200; 
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);

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
