const fullDate = new Intl.DateTimeFormat('es-PE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const monthYear = new Intl.DateTimeFormat('es-PE', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return fullDate.format(date);
}

export function formatPeriod(start: Date, end?: Date): string {
  const startLabel = monthYear.format(start);
  const endLabel = end ? monthYear.format(end) : 'actualidad';
  return `${startLabel} — ${endLabel}`;
}

export function tagSlug(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const levelLabel = {
  intro: 'Introducción',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
} as const;

export const kindLabel = {
  guia: 'Guía',
  laboratorio: 'Laboratorio',
} as const;
