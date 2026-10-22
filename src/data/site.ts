export const site = {
  name: 'Ivan Garcia Vega',
  role: 'Ingeniero de sistemas',
  description:
    'Ingeniero de sistemas especializado en la arquitectura de plataformas educativas, el desarrollo sobre LMS y la infraestructura que las opera.',
  url: 'https://igarcia53.github.io',
  email: 'iva.gar.veg@gmail.com',
  linkedin: 'https://www.linkedin.com/in/igarciavega/',
  twitter: 'https://twitter.com/ivangarciavega3',
  twitterHandle: '@ivangarciavega3',
  cvPath: '/cv/CV_Ivan_Garcia_Vega_full.pdf',
  ogImage: '/open-graph.png',
  ogImageAlt: 'Ivan Garcia Vega, ingeniería de sistemas, LMS y EdTech.',
  locale: 'es',
  ogLocale: 'es_PE',
} as const;

export const knowsAbout = [
  'Arquitectura de integraciones',
  'APIs',
  'LMS',
  'Moodle',
  'PHP',
  'Laravel',
  'JavaScript',
  'Ruby',
  'MySQL',
  'Docker',
] as const;

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/work/', label: 'Trayectoria' },
  { href: '/projects/', label: 'Proyectos' },
  { href: '/blog/', label: 'Blog' },
  { href: '/learn/', label: 'EdTech' },
] as const;

export const skills = [
  {
    label: 'Arquitectura',
    items: ['Integraciones', 'APIs', 'LMS'],
  },
  {
    label: 'Desarrollo',
    items: ['PHP', 'Laravel', 'JavaScript', 'Ruby'],
  },
  {
    label: 'Datos',
    items: ['MySQL', 'SQL Server'],
  },
  {
    label: 'Infraestructura',
    items: ['Docker', 'Git', 'WSL'],
  },
  {
    label: 'Plataformas',
    items: ['Moodle', 'Google Workspace'],
  },
] as const;
