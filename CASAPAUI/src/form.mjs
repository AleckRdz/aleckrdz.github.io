import { settings, interests } from './content.mjs';
import { esc, arrow } from './components.mjs';

export function enquiryForm() {
  const endpoint = settings.formEndpoint || '';
  return `<form id="contact-form" action="${esc(endpoint)}" method="POST" data-enquiry-form data-endpoint="${esc(endpoint)}">
    <div class="form-grid"><label>Tu nombre<input name="nombre" autocomplete="name" required maxlength="120" placeholder="Ej. Ana García"></label><label>WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" required maxlength="40" placeholder="811 000 0000"></label></div>
    <label>Me interesa<select name="interes">${interests.map(item => `<option value="${esc(item)}">${esc(item)}</option>`).join('')}</select></label>
    <label>Cuéntanos un poco más<textarea name="mensaje" required minlength="10" maxlength="4000" rows="4" placeholder="Tu espacio, tus ideas, lo que tienes en mente…"></textarea></label>
    <label class="consent"><input type="checkbox" name="consent" required><span>Acepto que me contacten sobre mi solicitud.</span></label>
    <button type="submit" class="button button-dark">ENVIAR ${arrow}</button><noscript><p class="form-note">Activa JavaScript para usar este formulario.</p></noscript><p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
}
