import type { APIContext } from 'astro';

import { site } from '../data/site';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext): Promise<Response> {
  if (!context.site) {
    throw new Error('astro.config debe definir site para generar el RSS.');
  }

  const posts = await getPosts();
  const lastBuild = posts[0]?.data.date;
  const origin = context.site;
  const self = new URL('/rss.xml', origin).href;

  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${post.id}/`, origin).href;
      const categories = post.data.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.summary || post.data.title)}</description>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${new URL('/', origin).href}</link>
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(site.description)}</description>
    <language>${site.locale}</language>
${lastBuild ? `    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>\n` : ''}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
