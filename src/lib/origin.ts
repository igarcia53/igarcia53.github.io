export function requireSite(site: URL | undefined): URL {
  if (!site) throw new Error('astro.config debe definir site.');
  return site;
}
