/* Accessible mobile menu for the portfolio; no external dependencies. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('site-nav-toggle');
  const links = document.getElementById('primary-nav-links');
  if (!header || !toggle || !links) return;

  const close = () => {
    links.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.querySelector('.nav-toggle-label').textContent = 'Menu';
    toggle.querySelector('.nav-toggle-icon').textContent = '☰';
  };

  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    if (opening) {
      links.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      toggle.querySelector('.nav-toggle-label').textContent = 'Close';
      toggle.querySelector('.nav-toggle-icon').textContent = '×';
    } else {
      close();
    }
  });

  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) close();
  });
  const desktop = window.matchMedia('(min-width: 1101px)');
  if (desktop.addEventListener) desktop.addEventListener('change', close);

  header.classList.add('js-nav-ready');
})();
