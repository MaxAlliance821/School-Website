// Starwell High School – Main JavaScript (fixed)

// ===== Smooth Scroll =====
function smoothScroll(targetSelector) {
  const targetEl = document.querySelector(targetSelector);
  if (!targetEl) return;
  // account for sticky header height (approx 72px)
  const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
}

function activateSmoothLinks(selector) {
  document.querySelectorAll(selector).forEach((link) => {
    link.addEventListener('click', (e) => {
      const hrefVal = link.getAttribute('href');
      if (hrefVal && hrefVal.startsWith('#')) {
        e.preventDefault();
        smoothScroll(hrefVal);
      }
    });
  });
}

activateSmoothLinks('.nav-link');
activateSmoothLinks('.cta-button');
activateSmoothLinks('.footer-links a');

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // close menu when any nav link clicked (mobile)
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
function showStatus(msg, type = 'success') {
  const existing = contactForm.querySelector('.status-message');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = `status status--${type} status-message`;
  div.textContent = msg;
  contactForm.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    if (!name || !email || !message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }
    showStatus('Your message has been sent successfully! We will get back to you soon.', 'success');
    contactForm.reset();
  });
}
