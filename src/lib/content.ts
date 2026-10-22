import { getCollection, type CollectionEntry } from 'astro:content';

import { tagSlug } from './format';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;
export type Job = CollectionEntry<'work'>;
export type Course = CollectionEntry<'courses'>;
export type Lesson = CollectionEntry<'lessons'>;

function byDateDesc<T extends { data: { date: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return byDateDesc(entries);
}

export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  return byDateDesc(entries);
}

export async function getJobs(): Promise<Job[]> {
  const entries = await getCollection('work');
  return entries.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}

export async function getCourses(): Promise<Course[]> {
  const entries = await getCollection('courses', ({ data }) => !data.draft);
  return byDateDesc(entries);
}

export async function getLessons(courseId?: string): Promise<Lesson[]> {
  const entries = await getCollection('lessons', ({ data }) => {
    if (data.draft) return false;
    if (courseId && data.course !== courseId) return false;
    return true;
  });
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export function collectTags(entries: { data: { tags: string[] } }[]): string[] {
  const tags = new Set<string>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b, 'es'));
}

export function filterByTag<T extends { data: { tags: string[] } }>(
  entries: T[],
  slug: string,
): T[] {
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
