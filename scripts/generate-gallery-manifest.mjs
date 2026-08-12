import { readdir, writeFile } from 'node:fs/promises';

const galleryDirectory = new URL('../Gallery/', import.meta.url);
const manifestPath = new URL('../gallery.json', import.meta.url);
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp']);

function captionFor(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim();
}

const files = await readdir(galleryDirectory, { withFileTypes: true });
const images = files
  .filter(file => file.isFile() && imageExtensions.has(file.name.slice(file.name.lastIndexOf('.')).toLowerCase()))
  .map(file => ({ src: `Gallery/${file.name}`, caption: captionFor(file.name) }))
  .sort((first, second) => first.src.localeCompare(second.src));

await writeFile(manifestPath, `${JSON.stringify({ images }, null, 2)}\n`);
