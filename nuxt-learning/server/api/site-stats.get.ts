import type { Stats } from '@/type/type';

export default defineEventHandler(async (event) => {
  try {
    const data = await $fetch<Stats>('http://localhost:8000/api/site-stats', {
      headers: { Accept: 'application/json' }
    });
    return data;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch stats' });
  }
});