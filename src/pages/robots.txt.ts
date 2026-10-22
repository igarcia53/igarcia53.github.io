import type { APIContext } from 'astro';

import { site } from '../data/site';

export function GET(context: APIContext): Response {
  const origin = context.site;
  if (!origin || origin.href.replace(/\/$/, '') !== site.url) {
    throw new Error(
      `La URL de astro.config (${origin?.href.replace(/\/$/, '') ?? 'sin definir'}) no coincide con site.url (${site.url}).`,
    );
  }

  const body = `User-agent: *
Allow: /
Disallow: /legacy-v1/

Sitemap: ${new URL('/sitemap-index.xml', origin).href}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
