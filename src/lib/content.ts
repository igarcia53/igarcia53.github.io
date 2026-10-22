import { getCollection, type CollectionEntry } from 'astro:content';

import { tagSlug } from './format';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;
export type Job = CollectionEntry<'work'>;
export type Course = CollectionEntry<'courses'>;
export type Lesson = CollectionEntry<'lessons'>;

let publicationCheck: Promise<void> | undefined;

function ensurePublicationRules(): Promise<void> {
  if (!publicationCheck) {
    publicationCheck = assertPublicationRules().catch((error: unknown) => {
      publicationCheck = undefined;
      throw error;
    });
  }
  return publicationCheck;
}

async function assertPublicationRules(): Promise<void> {
  const [projects, posts, courses, lessons] = await Promise.all([
    getCollection('projects'),
    getCollection('blog'),
    getCollection('courses'),
    getCollection('lessons'),
  ]);

  assertTagSlugs(
    'proyectos',
    projects.filter((entry) => !entry.data.draft),
  );
  assertTagSlugs(
    'blog',
    posts.filter((entry) => !entry.data.draft),
  );

  const publishedCourses = new Map(
    courses.filter((course) => !course.data.draft).map((course) => [course.id, course]),
  );
  const seenOrders = new Set<string>();

  for (const lesson of lessons) {
    if (lesson.data.draft) continue;
    const course = publishedCourses.get(lesson.data.course);
    if (!course) {
      throw new Error(
        `La lección "${lesson.id}" pertenece al curso "${lesson.data.course}", que no está publicado.`,
      );
    }
    if (!course.data.modules.includes(lesson.data.module)) {
      throw new Error(
        `La lección "${lesson.id}" usa el módulo "${lesson.data.module}", que no está en modules del curso "${course.id}".`,
      );
    }
    const key = `${lesson.data.course}:${lesson.data.order}`;
    if (seenOrders.has(key)) {
      throw new Error(
        `Las lecciones del curso "${lesson.data.course}" repiten el orden ${lesson.data.order}.`,
      );
    }
    seenOrders.add(key);
  }
}

function assertTagSlugs(label: string, entries: { data: { tags: string[] } }[]): void {
  const seen = new Map<string, string>();
  for (const tag of collectTags(entries)) {
    const slug = tagSlug(tag);
    if (!slug) {
      throw new Error(`En ${label}, la etiqueta "${tag}" no produce un slug válido.`);
    }
    const previous = seen.get(slug);
    if (previous && previous !== tag) {
      throw new Error(
        `En ${label}, las etiquetas "${previous}" y "${tag}" generan el mismo slug "${slug}".`,
      );
    }
    seen.set(slug, tag);
  }
}

function byDateDesc<T extends { data: { date: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(): Promise<Project[]> {
  await ensurePublicationRules();
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return byDateDesc(entries);
}

export async function getPosts(): Promise<Post[]> {
  await ensurePublicationRules();
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  return byDateDesc(entries);
}

export async function getJobs(): Promise<Job[]> {
  await ensurePublicationRules();
  const entries = await getCollection('work');
  return entries.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}

export async function getCourses(): Promise<Course[]> {
  await ensurePublicationRules();
  const entries = await getCollection('courses', ({ data }) => !data.draft);
  return byDateDesc(entries);
}

export async function getLessons(courseId?: string): Promise<Lesson[]> {
  await ensurePublicationRules();
  const entries = await getCollection('lessons', ({ data }) => {
    if (data.draft) return false;
    if (courseId && data.course !== courseId) return false;
    return true;
  });

  if (!courseId) {
    return entries.sort(
      (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id, 'es'),
    );
  }

  const courses = await getCollection('courses');
  const course = courses.find((item) => item.id === courseId);
  const moduleIndex = new Map(course?.data.modules.map((name, index) => [name, index]) ?? []);

  return entries.sort((a, b) => {
    const moduleDelta =
      (moduleIndex.get(a.data.module) ?? 999) - (moduleIndex.get(b.data.module) ?? 999);
    if (moduleDelta !== 0) return moduleDelta;
    return a.data.order - b.data.order || a.id.localeCompare(b.id, 'es');
  });
}

export function collectTags(entries: { data: { tags: string[] } }[]): string[] {
  const tags = new Set<string>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b, 'es'));
}

export function filterByTag<T extends { data: { tags: string[] } }>(entries: T[], slug: string): T[] {
  return entries.filter((entry) => entry.data.tags.some((tag) => tagSlug(tag) === slug));
}

export function lessonSlug(lesson: Lesson): string {
  const slug = lesson.id.split('/').pop();
  if (!slug) throw new Error(`La lección ${lesson.id} no tiene slug.`);
  return slug;
}

export function lessonPath(lesson: Lesson): string {
  return `/learn/${lesson.data.course}/${lessonSlug(lesson)}/`;
}

export function groupLessons(course: Course, lessons: Lesson[]) {
  const known = new Set(course.data.modules);
  const extras = lessons
    .map((lesson) => lesson.data.module)
    .filter((module) => !known.has(module));
  const modules = [...course.data.modules, ...new Set(extras)];

  return modules
    .map((module) => ({
      module,
      lessons: lessons.filter((lesson) => lesson.data.module === module),
    }))
    .filter((group) => group.lessons.length > 0);
}

export function neighbors<T extends { id: string }>(entries: T[], id: string) {
  const index = entries.findIndex((entry) => entry.id === id);
  return {
    newer: index > 0 ? entries[index - 1] : undefined,
    older: index >= 0 ? entries[index + 1] : undefined,
  };
}
