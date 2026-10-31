import { spaces, materials, vanities, contact, links } from './content.mjs';
import { esc, img, arrow, eyebrow } from './components.mjs';
import { enquiryForm } from './form.mjs';

export function spacesSection() {
  const rows = spaces.map(item => `<article class="home-card">
    <div class="card-image"><a href="${esc(item.href)}" target="_blank" rel="noopener" aria-label="Cotiza ${esc(item.title)} por WhatsApp">${img(item.image, item.alt, '', false, '(max-width: 700px) 100vw, 39vw')}</a><span class="image-label">${esc(item.category)}</span></div>
    <div class="card-copy"><div class="card-location"><span>${esc(item.category)}</span><span>${esc(item.code)}</span></div><a class="card-title" href="${esc(item.href)}" target="_blank" rel="noopener"><h3>${esc(item.title)}</h3>${arrow}</a><p class="card-description accent">${esc(item.phrase)}</p><div class="card-facts"><span>${esc(item.details)}</span></div></div>
  </article>`).join('');
  return `<section id="espacios" class="collection section wrap" aria-labelledby="collection-title">
    ${eyebrow('03', 'Lo que hacemos')}
    <div class="section-heading"><h2 id="collection-title">LOS ESPACIOS.<br><span class="nogal">LAS POSIBILIDADES.</span></h2><div><p>Espacios extraordinarios,<br>pensados para la vida diaria.</p></div></div>
    <div class="spaces-list">${rows}</div>
    <div class="collection-bottom"><p class="accent">Únicos por diseño. Personales por naturaleza.</p><div class="collection-actions"><a class="text-link" href="collection.html">VER LA COLECCIÓN ${arrow}</a><a class="text-link" href="${esc(links.general)}" target="_blank" rel="noopener">COTIZA TU PROYECTO + ${arrow}</a></div></div>
  </section>`;
}

export function materialsSection() {
  return `<section class="materials section wrap" id="materiales" aria-labelledby="materials-title">
    ${eyebrow('04', 'Lo que hay por dentro')}
    <div class="section-heading"><h2 id="materials-title">MATERIALES DE PRIMERA.<br><span class="accent">Por dentro y por fuera.</span></h2></div>
    <div class="materials-grid">${materials.map(item => `<article><span class="tiny">${esc(item.code)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div>
  </section>`;
}

export function contactSection() {
  return `<section class="contact-section section wrap" id="contacto" aria-labelledby="contact-title">
    <div class="contact-copy">
      ${eyebrow('05', 'Abre una nueva puerta')}
      <h2 id="contact-title">HOLA,<br>CASA PPAUI.</h2>
      <p class="accent">Un espacio que imaginas. Una idea que empieza.<br>O simplemente el comienzo de algo.</p>
      <dl class="contact-details">
        <div><dt>WhatsApp</dt><dd><a href="${esc(links.general)}" target="_blank" rel="noopener">${esc(contact.whatsapp)} ${arrow}</a></dd></div>
        <div><dt>Instagram</dt><dd><a href="${esc(contact.instagramHref)}" target="_blank" rel="noopener">${esc(contact.instagram)} ${arrow}</a></dd></div>
        <div><dt>Visítanos</dt><dd>${esc(contact.office)}</dd></div>
      </dl>
    </div>
    <div class="contact-form-panel"><p class="eyebrow">Un poco sobre ti</p>${enquiryForm(true)}</div>
  </section>`;
}

export function collectionBody() {
  const cards = vanities.map(item => `<article class="home-card vanity-card">
    <div class="card-image"><a href="${esc(item.href)}" target="_blank" rel="noopener" aria-label="Pregunta por el vanity ${esc(item.name)}">${img(item.image, item.alt, '', false, '(max-width: 700px) 100vw, 39vw')}</a><span class="image-label">${esc(item.code)}</span></div>
    <div class="card-copy"><div class="card-location"><span>Vanity ${esc(item.name)}</span><span>${esc(item.code)}</span></div><div class="card-title"><h3>${esc(item.name)}</h3><strong class="vanity-price">${esc(item.price)}</strong></div><dl class="vanity-specs">${item.specs.map(([term, detail]) => `<div><dt>${esc(term)}</dt><dd>${esc(detail)}</dd></div>`).join('')}</dl><a class="button vanity-cta" href="${esc(item.href)}" target="_blank" rel="noopener">LO QUIERO ${arrow}</a></div>
  </article>`).join('');
  return `<header class="editorial-heading wrap">${eyebrow('CL', 'Colección')}<h1>VANITIES<br>COLLECTION.</h1><p class="accent">Piezas de diseño, listas para llevar.</p></header>
  <section class="collection section wrap" aria-label="Vanities Collection"><div class="spaces-list">${cards}</div><p class="collection-note">Precios en MXN, + IVA si requieres factura · Jaladeras opcionales · Entrega en punto medio o recolección en Santiago y Guadalupe, N.L.</p></section>`;
}
