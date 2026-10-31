import { mkdir, writeFile, copyFile, cp, readdir, rm } from 'node:fs/promises';
import { homepage, collectionPage } from './pages.mjs';
const output = new URL('../site/', import.meta.url);
await mkdir(output, { recursive: true });
for (const name of await readdir(output)) if (name.endsWith('.html')) await rm(new URL(name, output));
await cp(new URL('../assets/', import.meta.url), new URL('assets/', output), { recursive: true });
const pages = [['index', homepage()], ['collection', collectionPage()]];
for (const [name, html] of pages) {
  if (!/^[a-z0-9-]+$/.test(name)) throw Error('Page IDs must be URL-safe lowercase slugs.');
  await writeFile(new URL(`${name}.html`, output), html);
}
for (const file of await readdir(new URL('./', import.meta.url))) if (/\.(css|js|svg)$/.test(file)) await copyFile(new URL(file, import.meta.url), new URL(`assets/${file}`, output));
console.log(`Built ${pages.length} pages in site/.`);
