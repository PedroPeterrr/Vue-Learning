export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  try {
    const data = await $fetch(`http://localhost:8000/api/site-stats/${id}`, {
      method: 'PATCH',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return data;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update' });
  }
});