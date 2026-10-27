// Small interaction layer: 3D card tilt, cursor glow, smooth anchor handling.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 7;
      const rotateX = (0.5 - y) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('mousemove', (event) => {
    glow.style.left = `${event.clientX - 170}px`;
    glow.style.top = `${event.clientY - 170}px`;
  });
}

// Close the mobile menu after choosing a navigation link.
document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .nav-cta').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('#mainNav');
    if (menu.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
}
