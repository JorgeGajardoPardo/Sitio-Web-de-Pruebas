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

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
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
