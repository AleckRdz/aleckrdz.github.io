import { featured, steps, process, words } from './content.mjs';
import { esc, img, arrow, eyebrow } from './components.mjs';

export function frontCover() {
  const panels = featured.map((item, i) => `<article class="folio-panel ${i === 0 ? 'is-active' : ''}" data-folio="${i}">
    ${img(item.image, item.alt, 'folio-image', i === 0, '(max-width: 700px) 100vw, 65vw')}
    <div class="folio-shade"></div>
    <button class="folio-select" data-folio-select="${i}" type="button" aria-label="Ver ${esc(item.title)}" aria-pressed="${i === 0}"><span class="folio-number">0${i + 1}</span><span class="folio-setting">${esc(item.label)}</span><span class="folio-plus" aria-hidden="true">+</span></button>
    <div class="folio-detail"><h2>${esc(item.title)}</h2><p>${esc(item.line)}</p></div>
  </article>`).join('');
  return `<section class="lookbook wrap" aria-labelledby="hero-title">
    <div class="lookbook-kicker"><span class="eyebrow">DISEÑO E INTERIORES A MEDIDA</span><span class="eyebrow">MONTERREY, N.L. / VOLUMEN 01</span></div>
    <div class="lookbook-heading"><h1 id="hero-title">DISEÑANDO<br><span>ESPACIOS.</span></h1><div class="cover-note"><p><em class="accent">Construyendo historias.</em></p><a href="#espacios">Mira lo que hacemos ↓</a></div></div>
    <div class="folio-gallery" role="group" aria-label="Explora los espacios destacados">${panels}</div>
    <div class="folio-footer">
      <span class="tiny">Cocinas, closets y muebles a medida.<br>Hechos en Monterrey.</span>
      <a class="hero-property" href="#espacios"><span class="tiny">EN FOCO / <span data-hero-title>${esc(featured[0].title)}</span></span>${arrow}</a>
      <div class="hero-controls"><span data-slide-counter aria-live="polite">01 / ${String(featured.length).padStart(2, '0')}</span><button type="button" data-slide="prev" aria-label="Espacio anterior">←</button><button type="button" data-slide="next" aria-label="Espacio siguiente">→</button></div>
    </div>
  </section>`;
}

export function manifesto() {
  return `<section class="philosophy manifesto section wrap" id="quienes-somos" aria-labelledby="philosophy-title">
    ${eyebrow('01', 'Quiénes somos')}
    <div class="manifesto-composition">
      <h2 id="philosophy-title"><span>CADA RINCÓN</span><span class="manifesto-offset">CUENTA<span class="manifesto-dot">.</span></span></h2>
      <div class="manifesto-window" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="philosophy-copy"><p class="lead">Más de 10 años diseñando y construyendo espacios.</p><p>Diseño, carpintería y acabados con estándar americano, al servicio de tu casa. Diseñamos espacios que se viven todos los días, y los construimos hasta el último detalle.</p><span class="manifesto-footnote tiny">DISEÑO / OFICIO / VIDA DIARIA</span></div>
    </div>
  </section>`;
}

export function servicePlan() {
  const rooms = steps.map((step, i) => `<button hidden class="plan-room room-${i}" data-plan-service="${i}" type="button" aria-pressed="${i === 0}" aria-label="Ver el paso ${esc(step.room)}"><span>0${i + 1}</span><strong>${esc(step.room)}</strong>${arrow}</button>`).join('');
  const list = steps.map((step, i) => `<details class="service" name="services" ${i === 0 ? 'open' : ''}><summary><span class="service-number">0${i + 1}</span><span class="service-title">${step.title}</span><span class="service-toggle" aria-hidden="true">+</span></summary><div class="service-content"><p>${esc(step.text)}</p><a class="text-link" href="${esc(step.href)}" target="_blank" rel="noopener">${esc(step.cta)} ${arrow}</a></div></details>`).join('');
  return `<section class="services section wrap" id="proceso" aria-labelledby="services-title">
    ${eyebrow('02', 'Cómo trabajamos')}
    <div class="section-heading"><h2 id="services-title">Toda gran historia<br><span class="accent">empieza con una remodelación.</span></h2><p>Tu casa es personal.<br>Así empieza tu próximo capítulo.</p></div>
    <div class="services-workspace">
      <div class="plan-sheet">
        <div class="plan-caption tiny"><span>TU SIGUIENTE CAPÍTULO</span><span>TRES PASOS ↘</span></div>
        <div class="plan-canvas"><svg class="service-plan" viewBox="0 0 600 460" fill="none" aria-hidden="true"><path class="plan-base" d="M45 40H555V390H45ZM315 40V205H555M315 260V390M45 260H160M218 260H315"/><path class="plan-outline" pathLength="1" d="M45 40H555V390H45V40M315 40V205H555M315 260V390M45 260H160M218 260H315"/><path class="plan-door" d="M160 260V318A58 58 0 0 0 218 260M315 205H370A55 55 0 0 1 315 260"/><path class="plan-detail" d="M62 59H135V90H62ZM62 98H135V130H62ZM333 58H533V82H333ZM352 282H515V361H352ZM63 285H139V368H63Z"/><g class="plan-fallback-number"><text x="180" y="195">01</text><text x="420" y="160">02</text><text x="440" y="250">03</text></g></svg>${rooms}<span class="plan-compass" aria-hidden="true">N<br>↑</span></div>
        <p class="plan-instruction tiny">Elige un paso. Abre una posibilidad.</p>
      </div>
      <div class="services-list"><p class="eyebrow services-list-title">Elige un paso. Abre una posibilidad.</p>${list}</div>
    </div>
    <div class="journey">
      <div class="journey-heading"><p class="eyebrow">De una idea a un espacio propio</p><span class="tiny">TU PROYECTO / TRES PASOS</span></div>
      <div class="journey-track" aria-hidden="true"><svg viewBox="0 0 1000 40" preserveAspectRatio="none"><path class="track-base" d="M0 20H1000"/><path class="track-progress" d="M0 20H1000" pathLength="1"/></svg></div>
      <ol>${process.map((step, i) => `<li><span class="step-node">0${i + 1}</span><h3>${esc(step.title)}</h3><p>${esc(step.text)}</p></li>`).join('')}</ol>
    </div>
    <script>(function(){var palabras=${JSON.stringify(words)};var i=0;var el=document.getElementById('palabra-cambiante');if(!el)return;setInterval(function(){i=(i+1)%palabras.length;el.textContent=palabras[i];},1800);})();</script>
  </section>`;
}
