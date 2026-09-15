const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const progressBar = document.querySelector('.scroll-progress span');
const sections = [...document.querySelectorAll('main section[id]')];
const revealElements = [...document.querySelectorAll('.reveal')];
const year = document.querySelector('[data-year]');
const copyButton = document.querySelector('[data-copy]');
const copyFeedback = document.querySelector('.copy-feedback');

if (year) year.textContent = new Date().getFullYear();

function closeMenu() {
  if (!header || !menuToggle) return;
  header.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

copyButton?.addEventListener('click', async () => {
  const value = copyButton.dataset.copy;
  try {
    await navigator.clipboard.writeText(value);
    copyFeedback.textContent = 'Profile link copied.';
  } catch {
    copyFeedback.textContent = value;
  }
  window.setTimeout(() => { copyFeedback.textContent = ''; }, 2400);
});
