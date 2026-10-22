export const site = {
  name: 'Ivan Garcia Vega',
  role: 'Ingeniero de sistemas',
  description:
    'Ingeniero de sistemas especializado en LMS, Moodle y la arquitectura de plataformas educativas.',
  url: 'https://igarcia53.github.io',
  email: 'iva.gar.veg@gmail.com',
  linkedin: 'https://www.linkedin.com/in/igarciavega/',
  twitter: 'https://twitter.com/ivangarciavega3',
  cvPath: '/cv/CV_Ivan_Garcia_Vega_full.pdf',
  ogImage: '/open-graph.png',
  locale: 'es',
} as const;

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/work/', label: 'Trayectoria' },
  { href: '/projects/', label: 'Proyectos' },
  { href: '/blog/', label: 'Blog' },
  { href: '/learn/', label: 'EdTech' },
] as const;

export const skills = [
  {
    label: 'Plataformas',
    items: ['Moodle', 'LMS', 'Google Workspace'],
  },
  {
    label: 'Desarrollo',
    items: ['PHP', 'Laravel', 'JavaScript', 'Ruby', 'APIs'],
  },
  {
    label: 'Datos',
    items: ['MySQL', 'SQL Server'],
  },
  {
    label: 'Infraestructura',
    items: ['Docker', 'Git', 'WSL'],
  },
] as const;
