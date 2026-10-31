# Casa PPaui — Instrucciones para el sitio web (plantilla FORME)

> **Plantilla:** FORME de Riadly (Etsy). Demo: https://riadly-template-demos.pages.dev/themes/forme/
> **Versión a usar:** la edición **HTML** del paquete (también trae React + Vite y Next.js; ignóralas).
> **Referencia visual aprobada:** la maqueta "Casa PPaui — Sitio web" en Claude.
> Esta guía dice qué cambiar en cada sección de FORME, con los textos finales listos para pegar.

---

## 0. Antes de empezar

- [ ] Descargar y descomprimir el paquete de FORME desde Etsy. Trabajar en la carpeta **HTML**.
- [ ] Descomprimir `casappaui-assets.zip` y copiar todas las imágenes a la carpeta de imágenes de la plantilla (normalmente `assets/images/`).
- [ ] Hacer una copia de seguridad de la carpeta original antes de editar.
- [ ] Datos de contacto:
  - WhatsApp: **811 031 8238**
  - Instagram: **@casappaui**
  - Correo: `[confirmar: casapaui@gmail.com o casappaui@gmail.com]`
  - Dominio: `[casappaui.com / casappaui.mx]`

---

## 1. Identidad visual

### 1.1 Colores

En el CSS de FORME, al inicio, hay dos bloques `:root { ... }`. Reemplaza **los dos** por este:

```css
:root {
  --paper: #F4F0E8;   /* fondo principal (marfil) */
  --ink:   #242321;   /* texto principal (carbón) */
  --muted: #4E4740;   /* texto secundario (gris cálido) */
  --lime:  #E6DDCF;   /* fondos suaves (piedra) */
  --line:  #D9D1C3;   /* líneas divisorias */
  --wash:  #E6DDCF;   /* fondos de sección alterna (piedra) */
  --rust:  #80664F;   /* acento: etiquetas, segunda línea de títulos (nogal) */
  --display: 'Archivo', Arial, sans-serif;
  --body: 'Inter', Arial, sans-serif;
  --mono: 'IBM Plex Mono', monospace;
  --gutter: clamp(20px, 4vw, 64px);
  --max: 1600px;
}
```

Colores adicionales que se usan directo en algunas secciones:

| Uso | HEX |
|---|---|
| Franja "Quiénes somos" y plano del proceso (**nogal profundo**) | `#4A3627` |
| Texto claro sobre nogal | `#F4F0E8` |
| Etiquetas sobre nogal | `#D9C7AA` |
| Frase en itálica sobre nogal | `#E6D3B3` |
| Detalle dorado (subrayados, footer) | `#B59B73` |

> FORME usa un azul fuerte (`#2443C3`) como color de tinta en todo el sitio. Busca `2443c3` y `#2443C3` en el CSS y reemplázalo por `#242321` (texto) o `#4A3627` (fondos de franja).

### 1.2 Tipografías

FORME trae su propia letra ("Forme Display"). La sustituimos por Google Fonts. Pega esto dentro del `<head>` de cada página, antes del CSS de la plantilla:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

Y agrega al final del CSS:

```css
/* Títulos grandes: condensados, bold, en mayúsculas */
h1, .display, .section-title {
  font-family: 'Archivo', Arial, sans-serif;
  font-stretch: 72%;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.88;
}
/* Subtítulos y títulos de tarjetas */
h2, h3 { font-family: 'Archivo', Arial, sans-serif; font-stretch: 80%; font-weight: 600; }
/* Acento elegante: la segunda línea de los títulos */
.accent, em.accent {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-weight: 400;
  font-stretch: 100%;
  text-transform: none;
  color: #80664F;
}
/* Etiquetas tipo máquina de escribir: [ 01 ], CP / 01, etc. */
.label, .eyebrow { font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; }
```

**La idea de la marca: BOLD pero BESPOKE.** Títulos condensados, en bold y mayúsculas (como "PPAUI" del logo), siempre acompañados de una frase en itálica elegante (como "Casa"). Ejemplo: **DISEÑANDO ESPACIOS.** + *Construyendo historias.*

> Los nombres de clases (`.display`, `.label`, etc.) pueden variar en FORME. Si un estilo no se aplica, inspecciona el elemento en el navegador (clic derecho → Inspeccionar) y usa la clase que trae la plantilla.

### 1.3 Logo

- Header: `logo-oscuro.png`, 52 px de alto. Junto al logo, en letra mono pequeña, va el eslogan en dos líneas: *DISEÑANDO ESPACIOS. / CONSTRUYENDO HISTORIAS.* (reemplaza el texto "The Living Index / Architecture for the everyday").
- Footer: `logo-claro.png` sobre fondo carbón, de 110 px de alto.
- Favicon: pendiente una versión simplificada (solo la casita). Mientras tanto usa `logo-oscuro.png`.

### 1.4 Tono de los textos

- Pocas palabras y frases que se queden. Hablarle al cliente de **tú**.
- **Siempre en positivo.** No usar construcciones de negación ("no se improvisa", "no es X, es Y").
- No inventar cifras, testimonios ni premios.

---

## 2. Páginas de FORME: qué se queda y qué se va

| Página de FORME | Qué hacer |
|---|---|
| Homepage (`index.html`) | **Se queda.** Es el sitio principal (sección 3). |
| Property collection | **Se queda como `collection.html`** para los vanities Lino y Rovere, cuando haya fotos (sección 4). |
| The studio | Opcional, más adelante: página de "Nosotros" con foto de Paola y su pareja. |
| Journal + los 3 artículos | **Fuera por ahora.** Después pueden ser "La obra en casa", con el contenido del creador. |
| Home · Courtyard / Ridge / Pacific House | **Fuera.** Más adelante pueden ser páginas de proyecto (una por proyecto). |

Si una página se elimina, quita también su link del menú y del footer.

**Menú del header:** `Proceso · Espacios · Contacto` + botón **Cotiza tu proyecto +** (abre WhatsApp, sección 5).

---

## 3. Homepage, sección por sección (en orden)

### 3.1 Hero ("THE LIVING INDEX")

**Qué cambia en FORME:** los textos, y las 3 fotos del acordeón (City / Desert / Coast). La interacción se queda igual: al picar un panel se abre, y al picarlo de nuevo se ve la foto completa.

- **Etiqueta izquierda** (era "An independent collection of places to belong."): `DISEÑO E INTERIORES A MEDIDA`
- **Etiqueta derecha** (era "California / Volume 01"): `MONTERREY, N.L. / VOLUMEN 01`
- **Título** (era "THE LIVING INDEX."): `DISEÑANDO ESPACIOS.`
- **Frase lateral** (era "Three settings. Endless ways to live."), en itálica Cormorant color nogal: *Construyendo historias.*
- **Link pequeño** (era "Find your kind of somewhere ↓"): `Mira lo que hacemos ↓` → `#espacios`
- **El símbolo ✳** se puede quitar o cambiar por la casita del logo.

**Los 3 paneles:**

| # | Etiqueta del panel cerrado | Título del panel abierto | Línea corta | Foto |
|---|---|---|---|---|
| 01 | Cocina | Cocina en encino | Calidez de madera, detalles en latón. | `cocina-despues.jpg` |
| 02 | Vestidor | Walk-in closet en encino | Cada cosa en su lugar. | `closet-general.jpg` |
| 03 | Cocina | Cocina contemporánea | Tono nogal, de piso a techo. | `cocina-nogal.jpg` |

- Debajo del acordeón (era "In focus / Los Angeles, CA"): `EN FOCO / [título del panel abierto]`.
- Quita los textos de ubicación de cada panel ("LOS ANGELES, CA", etc.).

### 3.2 [ 01 ] Quiénes somos (era "OUR POINT OF VIEW / MORE THAN FOUR WALLS.")

- **Fondo:** nogal profundo `#4A3627`, con textos claros.
- **Etiqueta:** `[ 01 ] QUIÉNES SOMOS`
- **Título:** `CADA RINCÓN CUENTA.`
- **Frase en itálica:** *Más de 10 años diseñando y construyendo espacios.*
- **Texto (uno solo, corto):** Diseño, carpintería y acabados con estándar americano, al servicio de tu casa. Diseñamos espacios que se viven todos los días, y los construimos hasta el último detalle.
- **Línea mono final** (era "Architecture / Feeling / Everyday life"): `DISEÑO / OFICIO / VIDA DIARIA`
- Borra los demás párrafos de esta sección.

### 3.3 [ 02 ] Cómo trabajamos (era "A WAY FORWARD / A good move starts with a plan.")

Ponle `id="proceso"` a la sección.

- **Etiqueta:** `[ 02 ] CÓMO TRABAJAMOS`
- **Título:** Toda gran historia
  *empieza con una remodelación.* ← segunda línea en itálica Cormorant nogal
- **Texto lateral** (era "Your plans are personal…"): Tu casa es personal. Así empieza tu próximo capítulo.
- **Plano interactivo** (era Buying / Selling / Relocation). Fondo nogal `#4A3627`, cuadrícula y bordes en `#8C735F` / `#D9C7AA`:
  - Etiquetas del plano: `TU SIGUIENTE CAPÍTULO` / `TRES PASOS ↘`
  - Habitación 01: `Inspiración`
  - Habitación 02: `Proyecto y propuesta`
  - Habitación 03: `Bienvenido a casa`
- **Acordeón a la derecha** (encabezado: `ELIGE UN PASO. ABRE UNA POSIBILIDAD.`):

| # | Título | Texto al abrir | Botón |
|---|---|---|---|
| 01 | Inspiración para tu remodelación. | Platicamos de cómo vives, lo que te gusta y lo que tu espacio necesita. Reunimos ideas, referencias y medidas. | Empieza tu proyecto ↗ |
| 02 | Tu proyecto y propuesta económica. | Definimos diseño, materiales y alcance, y te entregamos una propuesta económica clara antes de empezar. | Solicita tu propuesta ↗ |
| 03 | Bienvenido a tu **[palabra que cambia]**. | Ejecutamos, instalamos y entregamos tu espacio listo para estrenar. | Cotiza tu proyecto ↗ |

**El "fill in the blank" del paso 03:** la palabra cambia sola cada 1.8 segundos, en itálica Cormorant nogal con subrayado dorado. Pega esto antes de `</body>`:

```html
<script>
  (function () {
    var palabras = ['nuevo hogar', 'nueva cocina', 'nuevo closet', 'nuevo baño', 'nuevo espacio'];
    var i = 0;
    var el = document.getElementById('palabra-cambiante');
    if (!el) return;
    setInterval(function () {
      i = (i + 1) % palabras.length;
      el.textContent = palabras[i];
    }, 1800);
  })();
</script>
```

Y en el título del paso 03 escribe:

```html
Bienvenido a tu <span id="palabra-cambiante" style="font-family:'Cormorant Garamond',serif;font-style:italic;color:#80664F;border-bottom:2px solid #B59B73;">nuevo hogar</span>.
```

- **Tres columnas de abajo** (era "From a possibility to a place of your own"):
  - Encabezado: `DE UNA IDEA A UN ESPACIO PROPIO` / `TU PROYECTO / TRES PASOS`
  - **01 · Tu perspectiva.** Escuchamos lo que importa: los grandes planes y los pequeños rituales de cada día.
  - **02 · Una imagen clara.** Diseño, materiales y presupuesto definidos desde el inicio. Sabes exactamente qué vas a recibir.
  - **03 · Espacio para lo que sigue.** Te acompañamos de la primera visita a la entrega, con comunicación clara en cada paso.

### 3.4 [ 03 ] Los espacios. Las posibilidades. (era "THE PROPERTY INDEX")

Ponle `id="espacios"` a la sección.

- **Etiqueta:** `[ 03 ] LO QUE HACEMOS`
- **Título:** `LOS ESPACIOS.` + `LAS POSIBILIDADES.` (segunda línea en nogal)
- **Texto lateral:** Espacios extraordinarios, pensados para la vida diaria.
- **Quita** los filtros (City / Desert / Coast / Saved / Maximum price) y el contador "3 homes in the collection".
- **Filas** (usa el diseño de las tarjetas de casas: foto a la izquierda, texto a la derecha). En cada fila:
  - Arriba a la izquierda: categoría · arriba a la derecha: código
  - Título grande · frase en itálica · línea de detalles (en lugar de "4 beds · 4 baths · sq ft")
  - **Sin precio.** Quita el botón de corazón ("Saved").
  - La flecha ↗ lleva a WhatsApp.

| Código | Categoría | Título | Frase (itálica) | Detalles | Foto |
|---|---|---|---|---|---|
| CP / 01 | Cocinas | Cocinas | El corazón de la casa, hecho a tu medida. | Gabinetes · Cubiertas · Salpicaderos · Iluminación | `cocina-esquinero.jpg` |
| CP / 02 | Vestidores | Vestidores y closets | Cada cosa en su lugar, todos los días. | Walk-in closets · Cajoneras · Entrepaños · Colgadores | `closet-cajonera.jpg` |
| CP / 03 | Baños | Baños | Tu rutina de cada mañana, más ligera. | Gabinetes · Cubiertas · Pisos · Muros · Iluminación | `bano.jpg` |
| CP / 04 | Empotrados | Muebles empotrados | Libreros y muebles que se integran a tu casa. | Recámaras · Estancias · Estudios · Escritorios | `recamara-oscura.jpg` |
| CP / 05 | Collection | Vanities Collection | Piezas de diseño, listas para llevar. | Lino · Rovere · 80 × 50 cm · Lavabo incluido · Herrajes Blum | `[foto del vanity terminado]` |

- **Cierre de la sección** (era "Different by design. Personal by nature."): *Únicos por diseño. Personales por naturaleza.* + botón `COTIZA TU PROYECTO +` (era "Explore the collection").

### 3.5 [ 04 ] Lo que hay por dentro (materiales) — sección nueva

FORME no trae esta sección. Usa como base el bloque de **"The Reading Room"** (que se elimina): tres columnas, quitando las fotos y dejando solo texto.

- **Fondo:** piedra `#E6DDCF`
- **Etiqueta:** `[ 04 ] LO QUE HAY POR DENTRO`
- **Título:** Materiales de primera.
  *Por dentro y por fuera.* ← itálica nogal
- **Columnas** (cada una con una línea carbón arriba):
  - `M / 01` · **Tableros Arauco** · Superficie uniforme para acabados lisos y perfectos.
  - `M / 02` · **Madera sólida** · Encino y maderas finas de Maderería Torres.
  - `M / 03` · **Herrajes 100% Blum** · Cierre suave BLUMOTION y bisagras probadas en 200,000 aperturas.

### 3.6 Secciones de FORME que se eliminan por ahora

| Sección | Motivo | ¿Cuándo vuelve? |
|---|---|---|
| [04] The Reading Room (blog) | Aún no hay contenido | Como "La obra en casa", con los videos del creador |
| [05] Your person at FORME | Falta la foto | Con foto de Paola y su pareja, como "Tu equipo en Casa PPaui" |
| [06] The other side of the story (testimonios) | No hay reseñas reales todavía | Con reseñas reales, con nombre y permiso del cliente |
| Off-market / Begin a private search | No aplica al negocio | — |

> Nunca dejar los testimonios ni los nombres de ejemplo de la plantilla ("Alex Morgan", "Example buyer").

### 3.7 [ 05 ] Contacto (era "OPEN A NEW DOOR / DEAR FORME,")

Ponle `id="contacto"` a la sección.

- **Etiqueta:** `[ 05 ] ABRE UNA NUEVA PUERTA`
- **Título:** `HOLA, CASA PPAUI.`
- **Frase en itálica:** *Un espacio que imaginas. Una idea que empieza. O simplemente el comienzo de algo.*
- **Datos** (borra "Demonstration contact details."):
  - `WHATSAPP` → 811 031 8238 (con link de WhatsApp)
  - `INSTAGRAM` → @casappaui (link a `https://instagram.com/casappaui`)
  - `VISÍTANOS` → Monterrey, con cita
- **Formulario** (encabezado: `UN POCO SOBRE TI`):
  - Tu nombre
  - WhatsApp
  - Me interesa: Cocina · Vestidor o closet · Baño · Mueble empotrado · Vanity Collection · Otro
  - Cuéntanos un poco más
  - ☐ Acepto que me contacten sobre mi solicitud.
  - Botón: `ENVIAR ↗`
- Borra "Demo form — no message will be sent."
- **Para que el formulario funcione:** crea una cuenta gratis en **formspree.io** → *New form* → copia la URL y ponla en la etiqueta del formulario:

  ```html
  <form action="https://formspree.io/f/XXXXXXX" method="POST">
  ```

  Cada campo necesita un `name` (`nombre`, `whatsapp`, `interes`, `mensaje`) para que llegue al correo.

### 3.8 Footer

- Fondo carbón `#242321`.
- `logo-claro.png` a la izquierda. A la derecha, en grande: `DISEÑANDO ESPACIOS.` + *Construyendo historias.* (itálica, dorado `#B59B73`).
- Línea inferior en letra mono: `© 2026 CASA PPAUI · MONTERREY, N.L.` y los links Proceso · Espacios · Contacto.

---

## 4. Página Collection (`collection.html`)

> Se arma cuando haya fotos reales de los vanities terminados. Usa como base la página **Property collection** de FORME.

- **Título:** `VANITIES COLLECTION.` + *Piezas de diseño, listas para llevar.*
- Una tarjeta por modelo (usa la tarjeta de casa de FORME):

| | Lino | Rovere |
|---|---|---|
| Código | CL / 01 | CL / 02 |
| Precio | $9,500 MXN | $13,900 MXN |
| Mueble | MDF en tono beige | Encino sólido |
| Lavabo | Blanco integrado | Cuarzo |
| Medidas | 80 × 50 cm | 80 × 50 cm |
| Versiones | Flotado o a piso | Flotado o a piso |
| Herrajes | Blum | Blum |

- **Nota:** Precios en MXN, + IVA si requieres factura · Jaladeras opcionales · Entrega en punto medio o recolección en Santiago y Guadalupe, N.L.
- **Botón en cada tarjeta:** `LO QUIERO ↗` → WhatsApp con el mensaje del modelo (sección 5).

---

## 5. Links de WhatsApp (ya con el número)

| Dónde | Link |
|---|---|
| Header, botones generales, flechas ↗ de Espacios | `https://wa.me/528110318238?text=Hola%20Casa%20PPaui%2C%20quiero%20cotizar%20un%20proyecto` |
| Vanity Lino | `https://wa.me/528110318238?text=Hola%2C%20me%20interesa%20el%20vanity%20Lino` |
| Vanity Rovere | `https://wa.me/528110318238?text=Hola%2C%20me%20interesa%20el%20vanity%20Rovere` |

Agrega `target="_blank" rel="noopener"` a cada link de WhatsApp e Instagram.

---

## 6. SEO básico (en el `<head>`)

**index.html**
```html
<html lang="es-MX">
<title>Casa PPaui | Cocinas, closets y muebles a medida en Monterrey</title>
<meta name="description" content="Diseñando espacios, construyendo historias. Cocinas, vestidores, baños y muebles a medida en Monterrey, con herrajes Blum y más de 10 años de experiencia.">
<meta property="og:title" content="Casa PPaui | Diseñando espacios. Construyendo historias.">
<meta property="og:description" content="Cocinas, vestidores, baños y muebles a medida en Monterrey.">
<meta property="og:image" content="assets/images/cocina-despues.jpg">
```

**collection.html**
```html
<title>Vanities Collection | Muebles de baño listos para llevar | Casa PPaui</title>
<meta name="description" content="Vanities de 80 cm en encino sólido o MDF, con lavabo incluido y herrajes Blum. Entrega en Monterrey.">
```

- Cada `<img>` lleva un `alt` descriptivo (ej. `alt="Cocina de encino con cubierta de piedra en Monterrey"`).
- Cambia también el `<title>` y la descripción de FORME ("The Living Index — FORME") en todas las páginas que se queden.

---

## 7. Fotos: dónde va cada una

| Archivo | Sección |
|---|---|
| `logo-oscuro.png` | Header |
| `logo-claro.png` | Footer |
| `cocina-despues.jpg` | Hero panel 01 · imagen para compartir (og:image) |
| `closet-general.jpg` | Hero panel 02 |
| `cocina-nogal.jpg` | Hero panel 03 |
| `cocina-esquinero.jpg` | Espacios · Cocinas |
| `closet-cajonera.jpg` | Espacios · Vestidores |
| `bano.jpg` | Espacios · Baños |
| `recamara-oscura.jpg` | Espacios · Empotrados |
| `cocina-antes.jpg`, `cocina-detalle.jpg`, `closet-lateral.jpg`, `bano-detalle.jpg`, `cocina-isla.jpg`, `cocina-talavera.jpg` | Reserva para futuras páginas de proyecto |
| `arauco.jpg`, `madera.jpg`, `blum.jpg` | Reserva. En la web, Materiales va solo con texto. |

**No uses** `recamara-blanca.jpg` (sale la cama destendida).

Fotos pendientes que suben el nivel:
- [ ] Vanities Lino y Rovere terminados (para Espacios CP / 05 y Collection)
- [ ] Paola y su pareja en obra (para "Tu equipo en Casa PPaui")
- [ ] Cajón abierto mostrando el Blum

Si agregas fotos nuevas: máximo 1600 px de ancho, comprimidas en squoosh.app (WebP o JPG, calidad 80).

---

## 8. Publicar el sitio

**Netlify (gratis):**
1. Entra a app.netlify.com y crea una cuenta.
2. Ve a **Add new site → Deploy manually**.
3. Arrastra la carpeta HTML completa (la que tiene `index.html`).
4. En un minuto tendrás un link tipo `casappaui.netlify.app`.
5. Dominio propio: cómpralo (Namecheap, GoDaddy o Neubox) y en Netlify ve a **Domain settings → Add custom domain**.

**Para actualizar:** en Netlify ve a **Deploys** y vuelve a arrastrar la carpeta.

---

## 9. Revisión final antes de publicar

- [ ] Busca en todos los archivos y borra: "FORME", "Living Index", "California", "Los Angeles", "Palm Springs", "Carmel", "Alex Morgan", "Example", "Demo", "Lorem", "$".
- [ ] Ya no queda el color azul `#2443C3` en ningún lado.
- [ ] Los 3 paneles del hero abren y muestran la foto completa.
- [ ] La palabra del paso 03 cambia sola.
- [ ] Todos los botones de WhatsApp abren el chat con 811 031 8238.
- [ ] El formulario llega al correo (haz una prueba real).
- [ ] Revisa en tu celular: el hero, el plano y las filas de Espacios se ven bien.
- [ ] El menú lleva a Proceso, Espacios y Contacto.
- [ ] El título de la pestaña dice Casa PPaui y el favicon es el logo.
- [ ] Ninguna frase usa construcciones de negación.
- [ ] El correo de contacto coincide con la marca.
