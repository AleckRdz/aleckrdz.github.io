/* Casa PPaui / el lector abre el índice, arma una ventana y dibuja un camino. */
(() => {
  'use strict';
  if (!Element.prototype.animate || !window.IntersectionObserver) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set(), revealed = new WeakSet();
  const ease = 'cubic-bezier(.22,1,.36,1)';
  let running = false, observer, frame = 0;
  function animate(element, keyframes, options = {}, name = 'reveal') {
    if (!element || !running || preference.matches || document.hidden) return;
    for (const a of animations) if (a.effect.target === element) { a.cancel(); animations.delete(a); }
    const a = element.animate(keyframes, { duration: 850, easing: ease, fill: 'both', ...options });
    a.id = `ppaui-${name}`; animations.add(a);
    a.finished.then(() => { a.cancel(); animations.delete(a); }, () => animations.delete(a));
    return a;
  }
  const rise = (element, delay = 0, name = 'reveal') => animate(element, [{ opacity: 0, transform: 'translateY(25px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay }, name);
  document.addEventListener('focusin', event => {
    for (const a of animations) if (a.effect.target.contains(event.target)) { a.cancel(); animations.delete(a); }
    for (let el = event.target; el; el = el.parentElement) { revealed.add(el); observer?.unobserve(el); }
  });
  function entrance() {
    if (scrollY > 80 || location.hash) return;
    animate($('#hero-title'), [{ clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-18px)' }, { clipPath: 'inset(0 0 0 0)', transform: 'translateX(0)' }], { duration: 1100 }, 'cover-type');
    rise($('.cover-note'), 260, 'cover-note');
    $$('.folio-panel').forEach((panel, i) => animate(panel, [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: 1200, delay: 150 + i * 140 }, 'cover-panel'));
  }
  const selectors = 'main h1:not(#hero-title),main h2:not(.folio-detail h2):not(.manifesto h2),.section-label,.home-card,.journal-card,.photo-window,.philosophy-copy,.service,.journey li,.advisor-signature,.testimonial-content,.contact-form-panel,.values article,.article-prose>p';
  function observe() {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target; observer.unobserve(el);
        if (revealed.has(el) || el.contains(document.activeElement)) continue;
        revealed.add(el);
        if (el.matches('.journal-card')) animate(el, [{ opacity: 0, translate: '0 45px' }, { opacity: 1, translate: '0 0' }], { duration: 900 }, 'publication');
        else if (el.matches('.photo-window')) animate(el, [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: 1100 }, 'photo');
        else rise(el);
      }
    }, { threshold: .07, rootMargin: '0px 0px 30px 0px' });
    $$(selectors).forEach(el => { if (!revealed.has(el)) observer.observe(el); });
  }
  const manifesto = $('.manifesto'), phrase = $('.manifesto-offset'), panes = $$('.manifesto-window span');
  const plan = $('.plan-sheet'), outline = $('.plan-outline'), journey = $('.journey'), steps = $$('.step-node');
  const clamp = n => Math.min(1, Math.max(0, n));
  function update() {
    frame = 0; if (!running || document.hidden) return;
    const viewport = innerHeight;
    const wall = manifesto?.getBoundingClientRect();
    if (wall && wall.bottom > 0 && wall.top < viewport) {
      const progress = clamp((viewport - wall.top) / (viewport + wall.height * .35));
      const distance = (1 - progress) * Math.min(58, innerWidth * .09);
      phrase.style.transform = `translateX(${((1 - progress) * -25).toFixed(2)}px)`;
      panes.forEach((pane, i) => { pane.style.transform = `translate(${(i % 2 ? distance : -distance).toFixed(2)}px,${(i < 2 ? -distance : distance).toFixed(2)}px) rotate(${((1 - progress) * (i % 2 ? 12 : -12)).toFixed(2)}deg)`; });
    }
    const sheet = plan?.getBoundingClientRect();
    if (sheet && sheet.bottom > 0 && sheet.top < viewport) outline.style.strokeDashoffset = (1 - clamp((viewport * .92 - sheet.top) / Math.max(180, sheet.height * .75))).toFixed(3);
    const route = journey?.getBoundingClientRect();
    if (route && route.bottom > 0 && route.top < viewport) {
      const progress = clamp((viewport * .9 - route.top) / Math.max(150, route.height * .9));
      journey.style.setProperty('--journey-progress', progress.toFixed(3));
      steps.forEach((node, i) => node.classList.toggle('is-reached', progress >= i / Math.max(1, steps.length - 1)));
    }

  }
  const schedule = () => { if (running && !frame) frame = requestAnimationFrame(update); };
  addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule, { passive: true }); addEventListener('load', schedule);
  $$('.service').forEach(service => service.addEventListener('toggle', () => { if (service.open) rise(service.querySelector('.service-content'), 0, 'service'); schedule(); }));
  window.PpauiMotion = {
    folio(panel) {
      $$('.folio-detail').forEach(caption => { for (const a of animations) if (a.effect.target === caption) { a.cancel(); animations.delete(a); } });
      // Reveal the identity after its panel opens; never animate or replace the link.
      animate(panel.querySelector('.folio-detail'), [{ opacity: 0, translate: '0 20px' }, { opacity: 1, translate: '0 0' }], { duration: 550, delay: 130 }, 'folio-caption');
      animate(panel.querySelector('.folio-image'), [{ scale: '1.075' }, { scale: '1' }], { duration: 1000 }, 'folio-depth');
    },
    menu(nav, open) {
      for (const a of animations) if (nav.contains(a.effect.target)) { a.cancel(); animations.delete(a); }
      if (!open) return;
      animate(nav, [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: 600 }, 'menu');
      [...nav.children].forEach((el, i) => rise(el, 60 * i, 'menu-link'));
    },
    quote(slide, direction) {
      for (const a of animations) if (a.effect.target.matches('[data-testimonial]')) { a.cancel(); animations.delete(a); }
      animate(slide, [{ opacity: 0, transform: `translateY(${direction * 24}px)` }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650 }, 'quote');
    },
    dialog(el) { animate(el, [{ opacity: 0, transform: 'translateY(25px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400 }, 'dialog'); },
    save(button) { animate(button.querySelector('svg'), [{ transform: 'scale(1)' }, { transform: 'scale(1.3)', offset: .4 }, { transform: 'scale(1)' }], { duration: 450 }, 'save'); },
  };
  function stop() {
    running = false; observer?.disconnect(); cancelAnimationFrame(frame); frame = 0;
    animations.forEach(a => a.cancel()); animations.clear();
    phrase?.style.removeProperty('transform'); panes.forEach(pane => pane.style.removeProperty('transform'));
    outline?.style.removeProperty('stroke-dashoffset'); journey?.style.removeProperty('--journey-progress'); steps.forEach(el => el.classList.remove('is-reached'));
    document.documentElement.classList.remove('motion-enabled');
  }
  function start(intro = false) { if (running || preference.matches || document.hidden) return; running = true; document.documentElement.classList.add('motion-enabled'); if (intro) entrance(); observe(); schedule(); }
  preference.addEventListener('change', () => preference.matches ? stop() : start());
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  addEventListener('pagehide', stop); addEventListener('pageshow', e => { if (e.persisted) start(); });
  start(true);
})();
