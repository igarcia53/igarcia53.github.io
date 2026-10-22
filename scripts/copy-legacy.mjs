import { cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

if (!existsSync('dist')) {
  console.error('No existe dist/. Ejecuta astro build primero.');
  process.exit(1);
}

if (!existsSync('legacy-v1/index.html')) {
  console.error('legacy-v1/index.html no existe. El archivo anterior tiene que quedar publicado.');
  process.exit(1);
}

await rm('dist/legacy-v1', { recursive: true, force: true });
await cp('legacy-v1', 'dist/legacy-v1', { recursive: true });

if (!existsSync('dist/legacy-v1/index.html')) {
  console.error('La copia a dist/legacy-v1/index.html no se completó.');
  process.exit(1);
}
