window.addEventListener("load", () => {
  // Ocultar loader cuando todo esté cargado
  document.getElementById("loader").style.display = "none";

  // Carrusel automático
  let slides = document.querySelectorAll(".slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.style.opacity = (idx === i) ? "1" : "0";
    });
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000); // cambia cada 5 segundos
});

// Carrusel
let slides = document.querySelectorAll(".slide");
let index = 0;
function showSlides(){
  slides.forEach((s,i)=> s.style.opacity = (i===index?1:0));
  index = (index+1)%slides.length;
}
setInterval(showSlides, 4000);

// Modal galería
function openModal(img){
  document.getElementById("modal").style.display="flex";
  document.getElementById("modal-img").src=img.src;
}
function closeModal(){
  document.getElementById("modal").style.display="none";
}

// Menú hamburguesa con slide-in y botón de cierre
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

// Crear botón de cierre dinámicamente
const closeBtn = document.createElement("div");
closeBtn.classList.add("close-menu");
closeBtn.innerHTML = "&times;";
menu.prepend(closeBtn);

hamburger.onclick = () => {
  menu.classList.toggle("show");
};
closeBtn.onclick = () => {
  menu.classList.remove("show");
};

// Cerrar menú al hacer clic en un enlace (mobile)
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});

// Cálculo árboles salvados (aprox: 1 tonelada cartón = 17 árboles)
document.getElementById("arboles").innerText = 300*17;

// Envío de correo (simulado)
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Mensaje enviado correctamente. Pronto nos pondremos en contacto.");
});
// Animación al hacer scroll en "Sobre Nosotros"
const fadeElements = document.querySelectorAll("#sobre-nosotros p, #sobre-nosotros h2");

function checkVisibility() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);
