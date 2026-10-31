/* Casa PPaui: navegación simple y mejoras progresivas. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  // Los paneles del hero se abren al elegirlos.
  const panels = $$('[data-folio]');
  const selectors = $$('[data-folio-select]');
  const featuredEl = $('#ppaui-featured');
  let featured = [];
  try { featured = featuredEl ? JSON.parse(featuredEl.textContent) : []; } catch { featured = []; }
  let index = 0;
  function selectFolio(next, focus = false) {
    if (!panels.length) return;
    index = (next + panels.length) % panels.length;
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
    selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    const item = featured[index];
    const title = $('[data-hero-title]');
    if (item && title) title.textContent = item.title;
    const counter = $('[data-slide-counter]');
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
    if (focus) selectors[index].focus({ preventScroll: true });
    window.PpauiMotion?.folio(panels[index]);
  }
  selectors.forEach((button, i) => {
    button.addEventListener('click', () => selectFolio(i));
    button.addEventListener('keydown', event => {
      const target = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: selectors.length - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      selectFolio(target, true);
    });
  });
  $$('[data-slide]').forEach(button => button.addEventListener('click', () => selectFolio(index + (button.dataset.slide === 'next' ? 1 : -1))));

  // El plano y el acordeón comparten un solo estado.
  const services = $$('.service');
  const rooms = $$('[data-plan-service]');
  const syncPlan = () => rooms.forEach((button, i) => button.setAttribute('aria-pressed', String(services[i].open)));
  rooms.forEach((button, i) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      services.forEach((service, k) => { service.open = k === i; });
      syncPlan();
    });
  });
  if (rooms.length) $('.plan-sheet')?.classList.add('plan-ready');
  services.forEach(service => service.addEventListener('toggle', syncPlan));

  // Formulario: envío a Formspree con aviso de estado.
  $$('[data-enquiry-form]').forEach(form => {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    const label = submit.innerHTML;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity() || submit.disabled) return;
      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        status.textContent = 'Escríbenos por WhatsApp y con gusto te ayudamos.';
        return;
      }
      submit.disabled = true;
      submit.textContent = 'Enviando…';
      status.textContent = '';
      delete status.dataset.error;
      try {
        const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('send failed');
        status.textContent = 'Gracias. Recibimos tu mensaje y te contactamos pronto.';
        form.reset();
      } catch {
        status.dataset.error = 'true';
        status.textContent = 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.';
      } finally {
        submit.disabled = false;
        submit.innerHTML = label;
      }
    });
  });
})();
