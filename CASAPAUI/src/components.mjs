import { settings, links, contact, featured } from './content.mjs';
import { navigation } from './navigation.mjs';

export const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
export const eyebrow = (number, label) => `<p class="eyebrow section-label"><span>[ ${number} ]</span>${label}</p>`;
export const img = (file, alt, classes = '', eager = false, sizes = '(max-width: 700px) 100vw, 50vw') =>
  `<img class="${classes}" src="assets/img/${file}" sizes="${sizes}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" ${eager ? 'fetchpriority="high"' : ''} decoding="async">`;
export const waLink = (href = links.general, label, classes = '') =>
  `<a class="${classes}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
export const logoDark = '<img class="brand-logo" src="assets/img/logo-oscuro.png" alt="Casa PPaui" width="150" height="52">';
export const logoLight = '<img class="footer-logo" src="assets/img/logo-claro.png" alt="Casa PPaui" width="110" height="38">';

export function layout(title, description, body, { home = false, current = '' } = {}) {
  const prefix = home ? '' : 'index.html';
  const footerLinks = `<a href="${prefix}#proceso">Proceso</a><a href="${prefix}#espacios">Espacios</a><a href="${prefix}#contacto">Contacto</a>`;
  return `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#F4F0E8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/img/cocina-despues.jpg.jpeg">
<link rel="icon" href="assets/img/logo-oscuro.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/motion.css"><link rel="stylesheet" href="assets/lookbook.css"><link rel="stylesheet" href="assets/navigation.css"><link rel="stylesheet" href="assets/theme.css">
<script src="assets/motion.js" defer></script><script src="assets/app.js" defer></script><script src="assets/navigation.js" defer></script>
</head><body class="${home ? 'is-home' : 'inner-page'}">
<a class="skip-link" href="#main">Saltar al contenido</a>
${navigation(prefix, current)}
<main id="main">${body}</main>
<footer class="site-footer wrap">
  <div class="footer-top">
    ${logoLight}
    <p class="footer-motto"><strong>DISEÑANDO ESPACIOS.</strong><em>Construyendo historias.</em></p>
  </div>
  <div class="footer-bottom"><span>© ${settings.year} CASA PPAUI · MONTERREY, N.L.</span><nav aria-label="Pie de página">${footerLinks}</nav></div>
</footer>
<div class="toast" role="status" aria-live="polite"></div>
<script id="ppaui-featured" type="application/json">${JSON.stringify(featuredData()).replace(/</g, '\\u003c')}</script>
</body></html>`;
}

function featuredData() {
  return featured.map(({ label, title }) => ({ label, title }));
}
export const contactLine = `<a href="${esc(links.general)}" target="_blank" rel="noopener">${esc(contact.whatsapp)} ${arrow}</a>`;
