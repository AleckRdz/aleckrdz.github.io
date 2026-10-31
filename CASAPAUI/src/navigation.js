/* Casa PPaui: menú móvil del header. */
(() => {
  'use strict';
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById(toggle?.getAttribute('aria-controls'));
  if (!toggle || !menu) return;
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('nav-is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  addEventListener('resize', () => { if (innerWidth > 900) setOpen(false); }, { passive: true });
})();
