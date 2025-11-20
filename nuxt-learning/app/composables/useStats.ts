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

interface Stats {
  series: number
  lessons: number
}

export function useStats() {
  const { data: stats } = useFetch<Stats>(
    'http://localhost:8000/api/site-stats',
    { headers: { Accept: 'application/json' } }
  )

  const series = computed(() => stats.value?.series ?? 'N/A')
  const lessons = computed(() => stats.value?.lessons ?? 'N/A')

  return { series, lessons}
}
