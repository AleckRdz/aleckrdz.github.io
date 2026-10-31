# FORME - HTML / CSS / JavaScript

Porcelain paper, ink blue and rust, with architectural line work and magazine-style compositions.

An expanding photographic property index opens the homepage. An interactive service floor plan, advisor dossier and magazine-style journal bring an architectural publication approach to property browsing. The service floor plan is an interface illustration, not a measured architectural plan.

## Start

The ready-to-host website is in `site/`. To preview with consistent module, form and browser-storage behavior, install Node.js 22.12 or later, open a terminal in this extracted folder, and run:

```sh
npm run preview
```

Open the address printed in the terminal. No dependency installation is needed. To rebuild after source edits:

```sh
npm run build
npm run preview
```

The build writes only to `site/` and removes old generated HTML pages so retired routes do not remain. It copies local assets, generates the ten pages and uses no files outside this folder. Editing the finished HTML is possible, but a later build overwrites those edits. Choose either source editing or finished-file editing.

## Customize

- Content and form endpoint: `src/content.mjs`.
- Shared layouts and markup: `src/components.mjs`, `src/pages.mjs` and the other source modules.
- Colors, type and responsive layout: `src/style.css` and the theme's additional CSS files in `src/`.
- Interactive behavior and motion: the JavaScript files in `src/`.
- Images and font notices: `assets/`. Replace full-size and `-800.webp` variants together.

Keep property and article IDs unique and URL-safe. Update image references, descriptive alt text, filters, currency, area units, business identity and contact details together. Check the supplied currency formatter and area labels for your market. Replace fictional listings, advisor identities and labelled sample testimonials with accurate material before launch.

## Enquiry forms

Forms begin in demo mode and send nothing. Set `settings.formEndpoint` in the content file to your own HTTPS endpoint, rebuild and test delivery. The frontend sends FormData; the endpoint must handle the submitted fields, CORS where needed, server validation, spam controls and actual delivery. Keep credentials and secret keys out of client files. Check a valid submission and a failed request/retry. A viewing tool or property enquiry is not a confirmed booking.

Saving and session tools use the visitor's browser storage where available. Adapt privacy and consent information for your real service.

## Host the website

Upload the contents of `site/`, with `assets/` beside the HTML files, to a static web host. Relative links support a domain root or a subdirectory. Do not upload the source package as a public download.

Hosting, domain, CMS, backend, listing feed, payments, custom development and a booking system are not included. This is source code, not a WordPress, Shopify, Squarespace or drag-and-drop-builder theme. The three purchased code editions are alternatives for the same end product.

## Licence and credits

Read the unchanged `LICENSE.md` for the actual terms: one purchase permits one live end-product website, for you or one client. Another website requires another purchase. Do not redistribute or resell the template/source. Keep font notices. AI-generated property and portrait imagery depicts fictional examples. See `CREDITS.md` and any `artwork/` prompt records.

## Live demonstration

https://riadly-template-demos.pages.dev/preview/forme/

