import { cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

if (!existsSync('dist')) {
  console.error('No existe dist/. Ejecuta astro build primero.');
  process.exit(1);
}

await rm('dist/legacy-v1', { recursive: true, force: true });
await cp('legacy-v1', 'dist/legacy-v1', { recursive: true });
