import { links } from './content.mjs';

const logoDark = '<img class="brand-logo" src="assets/img/logo-oscuro.png" alt="Casa PPaui" width="150" height="52">';

export function navigation(prefix, current = '') {
  const currentAttr = key => (key === current ? ' aria-current="page"' : '');
  const linksHtml = `<a href="${prefix}#proceso"${currentAttr('proceso')}>Proceso</a><a href="${prefix}#espacios"${currentAttr('espacios')}>Espacios</a><a href="${prefix}#contacto"${currentAttr('contacto')}>Contacto</a>`;
  return `<header class="site-header wrap">
  <a class="brand" href="index.html" aria-label="Casa PPaui, inicio">${logoDark}<span class="brand-motto">DISEÑANDO ESPACIOS.<em>Construyendo historias.</em></span></a>
  <nav class="desktop-nav" aria-label="Principal">${linksHtml}<a class="header-wa" href="${links.general}" target="_blank" rel="noopener">Cotiza tu proyecto <span aria-hidden="true">+</span></a></nav>
  <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav"><span class="sr-only">Abrir menú</span><span></span><span></span></button>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Principal" hidden>${linksHtml}<a class="header-wa" href="${links.general}" target="_blank" rel="noopener">Cotiza tu proyecto +</a></nav>`;
}
