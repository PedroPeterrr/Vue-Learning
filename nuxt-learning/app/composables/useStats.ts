// export function useStats() {
//   const series = ref<number | string | null>(null)
//   const lessons = ref<number | string | null>(null)

//   onMounted(async () => {
//     try {
//       const data = await $fetch<{ series: number; lessons: number }>(
//         'http://localhost:8000/site-stats',
//         { headers: { Accept: 'application/json' } }
//       )
//       series.value = data.series
//       lessons.value = data.lessons
//     } catch (err) {
//       series.value = 'N/A'
//       lessons.value = 'N/A'
//       console.error('API error:', err)
//     }
//   })

//   return { series, lessons }
// }

import type{ Stats } from '@/type/type';

export function useStats() {
  const { data: stats, refresh } = useFetch<Stats>(
    "/api/site-stats",
    { headers: { Accept: "application/json" } }
  );

  const updateTitle = async (id: number, title: string) => {
    await $fetch(`/api/site-stats/${id}`, {
      method: "PATCH",
      body: { title },
    });

    refresh();
  };

  const createContent = async (title: string, type: "series" | "lesson") => {
    try {
      await $fetch("/api/site-stats", {
        method: "POST",
        body: {
          title,
          type,
        },
      });

      // Show success modal
      alert('Success!\nStats created successfully!');

      // Refresh the stats after creating new content
      refresh();
    } catch (error) {
      alert('Error\nSomething went wrong.');
    }
  };

  const deleteContent = async (id: number, type: 'series' | 'lesson') => {
    // Show SweetAlert confirmation
    const result = confirm(`Delete ${type}?\nAre you sure you want to delete this ${type}? This action cannot be undone.`);

    if (result) {
      try {
        await $fetch(`/api/site-stats/${id}`, {
          method: 'DELETE'
        });

        alert('Deleted!\n' + `${type} has been deleted.`);

        refresh(); // Refresh stats after deletion
      } catch (err) {
        alert('Error!\n' + `Failed to delete ${type}.`);
      }
    }
  };

  return {
    stats,
    series: computed(() => stats.value?.series ?? []),
    lessons: computed(() => stats.value?.lessons ?? []),
    updateTitle,
    createContent,
    deleteContent
  };
}
