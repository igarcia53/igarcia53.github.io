import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

function rejectDuplicates(values: string[], path: string, ctx: z.RefinementCtx): void {
  const seen = new Set<string>();
  values.forEach((value, index) => {
    const key = value.toLocaleLowerCase('es');
    if (seen.has(key)) {
      ctx.addIssue({
        code: 'custom',
        message: `Valor repetido en ${path}: ${value}.`,
        path: [path, index],
      });
    }
    seen.add(key);
  });
}

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      summary: z.string().default(''),
      date: z.coerce.date(),
      tags: z.array(z.string().min(1)).default([]),
      draft: z.boolean().default(false),
    })
    .superRefine((value, ctx) => {
      rejectDuplicates(value.tags, 'tags', ctx);
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      summary: z.string().default(''),
      date: z.coerce.date(),
      tags: z.array(z.string().min(1)).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      role: z.string().min(1).optional(),
      outcome: z.string().min(1).optional(),
      demoUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      image: z.string().startsWith('/').optional(),
      imageWidth: z.number().int().positive().optional(),
      imageHeight: z.number().int().positive().optional(),
    })
    .superRefine((value, ctx) => {
      rejectDuplicates(value.tags, 'tags', ctx);
      const hasImage = value.image !== undefined;
      const hasWidth = value.imageWidth !== undefined;
      const hasHeight = value.imageHeight !== undefined;
      if (hasImage !== hasWidth || hasImage !== hasHeight) {
        ctx.addIssue({
          code: 'custom',
          message: 'image, imageWidth e imageHeight se declaran juntos.',
          path: ['image'],
        });
      }
    }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      company: z.string().min(1),
      summary: z.string().default(''),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      tags: z.array(z.string().min(1)).default([]),
    })
    .superRefine((value, ctx) => {
      rejectDuplicates(value.tags, 'tags', ctx);
      if (value.endDate && value.endDate.getTime() < value.startDate.getTime()) {
        ctx.addIssue({
          code: 'custom',
          message: 'endDate no puede ser anterior a startDate.',
          path: ['endDate'],
        });
      }
    }),
});

const courses = defineCollection({
  loader: glob({ base: './src/content/courses', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      summary: z.string().default(''),
      date: z.coerce.date(),
      level: z.enum(['intro', 'intermedio', 'avanzado']).default('intro'),
      duration: z.string().min(1).optional(),
      tags: z.array(z.string().min(1)).default([]),
      draft: z.boolean().default(false),
      modules: z.array(z.string().min(1)).default([]),
    })
    .superRefine((value, ctx) => {
      rejectDuplicates(value.tags, 'tags', ctx);
      rejectDuplicates(value.modules, 'modules', ctx);
    }),
});

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().default(''),
    course: z.string().min(1),
    module: z.string().min(1),
    kind: z.enum(['guia', 'laboratorio']),
    order: z.number().int().positive(),
    duration: z.string().min(1).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, work, courses, lessons };
