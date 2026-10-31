/* FORME: progressive enhancements. All property and journal links work without JS. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const { filterHomes, readSaved, toggleSaved } = window.FormeModel;
  const homes = JSON.parse($('#forme-homes').textContent);
  const knownIds = homes.map(home => home.id);
  const storageKey = 'forme.saved.v1';
  let saved = [];
  try { saved = readSaved(localStorage.getItem(storageKey), knownIds); } catch { /* Private browsers may disable storage. */ }
  let toastTimer;
  function notify(message) {
    clearTimeout(toastTimer);
    $('.toast').textContent = message;
    $('.toast').classList.add('visible');
    toastTimer = setTimeout(() => $('.toast').classList.remove('visible'), 2800);
  }

  // Location, budget and saved status combine, rather than resetting each other.
  const params = new URLSearchParams(location.search);
  const requestedLocation = params.get('location');
  const filters = {
    location: homes.some(home => home.location === requestedLocation) ? requestedLocation : 'all',
    maxPrice: '',
    savedOnly: params.get('saved') === '1',
  };
  function applyFilters() {
    if (!$('[data-filters]')) return;
    const visible = filterHomes(homes, filters, saved).map(home => home.id);
    $$('[data-home]').forEach(card => { card.hidden = !visible.includes(card.dataset.home); });
    $$('[data-location-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.locationFilter === filters.location)));
    $('[data-saved-filter]').setAttribute('aria-pressed', String(filters.savedOnly));
    $('[data-empty]').hidden = visible.length > 0;
    $('[data-empty-message]').textContent = filters.savedOnly && !saved.length
      ? 'Save a home using its heart button, and you’ll find it here.'
      : 'No homes match these filters. Try another setting or a wider budget.';
    $('[data-result-count]').textContent = `${visible.length} ${visible.length === 1 ? 'home' : 'homes'} in the collection${filters.savedOnly ? ' · saved homes' : ''}`;
  }
  $$('[data-location-filter]').forEach(button => button.addEventListener('click', () => {
    filters.location = button.dataset.locationFilter;
    applyFilters();
  }));
  $('[data-saved-filter]')?.addEventListener('click', () => {
    filters.savedOnly = !filters.savedOnly;
    applyFilters();
  });
  $('#budget')?.addEventListener('change', event => {
    filters.maxPrice = event.target.value;
    applyFilters();
  });
  $('[data-reset-filters]')?.addEventListener('click', () => {
    Object.assign(filters, { location: 'all', maxPrice: '', savedOnly: false });
    $('#budget').value = '';
    applyFilters();
    $('[data-location-filter="all"]').focus({ preventScroll: true });
  });
  function syncSaved() {
    $$('[data-save]').forEach(button => {
      const selected = saved.includes(button.dataset.save);
      button.setAttribute('aria-pressed', String(selected));
      button.setAttribute('aria-label', `${selected ? 'Unsave' : 'Save'} ${button.dataset.name}`);
    });
    $$('[data-saved-count]').forEach(counter => { counter.textContent = saved.length; });
    $('.shortlist-link').setAttribute('aria-label', `View saved homes (${saved.length})`);
    applyFilters();
  }
  $$('[data-save]').forEach(button => button.addEventListener('click', () => {
    saved = toggleSaved(saved, button.dataset.save);
    let stored = true;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { stored = false; }
    const selected = saved.includes(button.dataset.save);
    syncSaved();
    window.FormeMotion?.save(button);
    notify(`${button.dataset.name} ${selected ? 'added to' : 'removed from'} your saved homes.${stored ? '' : ' Saved for this page only.'}`);
    // Removing the focused card from a saved-only view should leave focus somewhere useful.
    if (filters.savedOnly && !selected) $('[data-saved-filter]')?.focus({ preventScroll: true });
  }));
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    saved = readSaved(event.newValue, knownIds);
    syncSaved();
  });
  syncSaved();

  // The property index expands in place; arrows and keyboard share one state.
  const panels = $$('[data-folio]');
  const selectors = $$('[data-folio-select]');
  let slideIndex = 0;
  function selectFolio(index, focus = false) {
    if (!panels.length) return;
    slideIndex = (index + homes.length) % homes.length;
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === slideIndex));
    selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === slideIndex)));
    const home = homes[slideIndex];
    $('.hero-property').href = `${home.id}.html`;
    $('[data-hero-name]').textContent = home.name;
    $('[data-hero-location]').textContent = `${home.village}, ${home.location}`;
    $('[data-slide-counter]').textContent = `${String(slideIndex + 1).padStart(2, '0')} / ${String(homes.length).padStart(2, '0')}`;
    if (focus) selectors[slideIndex].focus({ preventScroll: true });
    window.FormeMotion?.folio(panels[slideIndex]);
  }
  selectors.forEach((button, i) => {
    button.addEventListener('click', () => selectFolio(i));
    button.addEventListener('keydown', event => {
      const index = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: panels.length - 1 }[event.key];
      if (index === undefined) return;
      event.preventDefault(); selectFolio(index, true);
    });
  });
  panels.forEach((panel, i) => panel.querySelector('.folio-open').addEventListener('focus', () => { if (slideIndex !== i) selectFolio(i); }));
  $$('[data-slide]').forEach(button => button.addEventListener('click', () => selectFolio(slideIndex + (button.dataset.slide === 'next' ? 1 : -1))));

  // The drawing and native service disclosures remain synchronized.
  const services = $$('.service');
  const rooms = $$('[data-plan-service]');
  const syncPlan = () => rooms.forEach((button, i) => button.setAttribute('aria-pressed', String(services[i].open)));
  rooms.forEach((button, i) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      services.forEach((service, index) => { service.open = index === i; });
      syncPlan();
    });
  });
  if (rooms.length) $('.plan-sheet').classList.add('plan-ready');
  services.forEach(service => service.addEventListener('toggle', syncPlan));

  // Chapter navigation is useful even when decorative motion is disabled.
  const rail = $$('[data-rail-section]');
  const chapters = rail.map(link => document.getElementById(link.dataset.railSection));
  let chapterFrame = 0;
  function syncChapter() {
    chapterFrame = 0;
    let active = -1, nearest = Infinity;
    chapters.forEach((section, i) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= innerHeight * .55 && rect.bottom > 0 && Math.abs(rect.top) < nearest) { active = i; nearest = Math.abs(rect.top); }
    });
    rail.forEach((link, i) => i === active ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
  }
  const scheduleChapter = () => { if (!chapterFrame) chapterFrame = requestAnimationFrame(syncChapter); };
  addEventListener('scroll', scheduleChapter, { passive: true });
  addEventListener('resize', scheduleChapter, { passive: true });
  addEventListener('load', scheduleChapter); syncChapter();

  // Native dialogs supply Escape handling, focus containment and focus restoration.
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  }));
  $$('dialog').forEach(dialog => dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button, input:not([type="hidden"]), textarea, select, a[href], [tabindex="0"]')]
      .filter(control => !control.disabled && control.getClientRects().length);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
      event.preventDefault();
      first?.focus();
    }
  }));
  const enquiry = $('#enquiry-dialog');
  const dialogForm = $('#enquiry-form');
  $$('[data-enquire]').forEach(button => button.addEventListener('click', () => {
    dialogForm.elements.property.value = button.dataset.enquire;
    dialogForm.querySelector('[data-enquiry-context]').textContent = button.dataset.enquire;
    const status = dialogForm.querySelector('.form-status');
    status.textContent = '';
    delete status.dataset.error;
    enquiry.showModal();
    window.FormeMotion?.dialog(enquiry);
  }));

  // Both forms use the same delivery contract, with independent state and feedback.
  $$('[data-enquiry-form]').forEach(form => {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    const submitLabel = submit.innerHTML;
    const parentDialog = form.closest('dialog');
    const interest = form.querySelector('[data-contact-interest]');
    let request;
    let requestTimer;
    submit.disabled = false;
    const syncInterest = () => {
      if (interest) form.elements.property.value = interest.selectedOptions[0].textContent;
    };
    interest?.addEventListener('change', syncInterest);
    parentDialog?.addEventListener('close', () => { request?.abort(); clearTimeout(requestTimer); });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity() || submit.disabled) return;
      syncInterest();
      if (!form.dataset.endpoint) {
        status.textContent = 'Your enquiry preview is ready. No message was sent from this demo.';
        delete status.dataset.error;
        return;
      }
      submit.disabled = true;
      submit.textContent = 'Sending…';
      status.textContent = '';
      delete status.dataset.error;
      const controller = new AbortController();
      request = controller;
      requestTimer = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(form.dataset.endpoint, {
          method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal,
        });
        if (!response.ok) throw new Error('The form service could not accept the enquiry.');
        status.textContent = 'Thank you. Your enquiry has been sent. We look forward to getting to know your somewhere.';
        form.reset();
        syncInterest();
      } catch {
        if (!parentDialog || parentDialog.open) {
          status.dataset.error = 'true';
          status.textContent = 'Your enquiry couldn’t be sent. Your details are still here — please try again.';
        }
      } finally {
        clearTimeout(requestTimer);
        request = undefined;
        submit.disabled = false;
        submit.innerHTML = submitLabel;
      }
    });
  });

  const contactInterest = $('#contact-form [data-contact-interest]');
  function selectInterest(value) {
    if (!contactInterest || ![...contactInterest.options].some(option => option.value === value)) return;
    contactInterest.value = value;
    contactInterest.dispatchEvent(new Event('change'));
  }
  $$('[data-contact-intent]').forEach(link => link.addEventListener('click', () => {
    selectInterest(link.dataset.contactIntent);
    contactInterest?.focus({ preventScroll: true });
  }));
  selectInterest(params.get('enquiry'));

  const testimonials = $$('[data-testimonial]');
  let testimonialIndex = 0;
  $$('[data-testimonial-step]').forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + Number(button.dataset.testimonialStep) + testimonials.length) % testimonials.length;
      testimonials.forEach((slide, index) => { slide.hidden = index !== testimonialIndex; });
      window.FormeMotion?.quote(testimonials[testimonialIndex], Number(button.dataset.testimonialStep));
      $('[data-testimonial-counter]').textContent = `${String(testimonialIndex + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}`;
    });
  });
  $$('[data-photo]').forEach(button => button.addEventListener('click', () => {
    const dialog = $('#photo-dialog');
    const image = dialog.querySelector('img');
    image.src = `assets/${button.dataset.photo}.webp`;
    image.alt = button.dataset.photoAlt;
    dialog.querySelector('p').textContent = button.dataset.photoTitle;
    dialog.showModal();
    window.FormeMotion?.dialog(dialog);
  }));
  $('.back-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    $('.brand').focus({ preventScroll: true });
  });
})();
