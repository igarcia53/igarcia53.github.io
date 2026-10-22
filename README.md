# Portafolio de Ivan Garcia Vega

Sitio personal en Astro 5, salida estática. La versión publicada anterior queda en `legacy-v1/` y el build la copia a `dist/legacy-v1/` para que siga disponible en `/legacy-v1`.

## Requisitos

Node.js 22 o superior.

## Comandos

```bash
npm install
npm run check    # TypeScript strict, con una sola versión de Vite
npm run dev      # http://localhost:4321
npm run build    # genera dist/ y copia legacy-v1
npm run preview  # sirve dist/ en local
```

Vite queda fijado en 6.4.5, la línea que usa Astro. Así el plugin de Tailwind y `tsc` resuelven el mismo compilador.

## Contenido

Las colecciones viven en `src/content/` y se validan en `src/content.config.ts`.

- `work`: trayectoria
- `projects`: proyectos. `draft: true` no genera página
- `blog`: notas. `draft: true` queda fuera del listado y del RSS
- `courses` y `lessons`: hub EdTech en `/learn`

Las etiquetas tienen página propia (`/projects/etiqueta/...` y `/blog/etiqueta/...`). No hay buscador: el archivo publicado no justifica un índice aparte.

## Deploy

El workflow de GitHub Actions, en cada push a `master`, instala dependencias, ejecuta `npm run build` y publica solo `dist/` en GitHub Pages. La raíz del sitio nuevo reemplaza https://igarcia53.github.io/ y el archivo anterior queda en https://igarcia53.github.io/legacy-v1/.
