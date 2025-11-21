export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  try {
    const data = await $fetch(`http://localhost:8000/api/site-stats/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });
    return data;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete' });
  }
});