// export function useDestinations() {
//   const destinations = ref<Destination[]>([])
//   const loading = ref(true)

//   onMounted(async () => {
//     try {
//       const res = await fetch('https://jsonplaceholder.typicode.com/users')
//       destinations.value = await res.json()
//     } catch (err) {
//       // console.error('Fetch error:', err)
//     } finally {
//       loading.value = false
//     }
//   })

//   const filter = (term: string) => {
//     const lower = term.toLowerCase()
//     return destinations.value.filter((d) => d.name.toLowerCase().includes(lower))
//   }

//   return { destinations, loading, filter }
// }

import type { Destination } from '@/type/type'

export function useDestinations(searchTerm = ref(''), loading = ref(false)) {
  // useFetch automatically handles SSR, JSON parsing, and reactivity
  const { data: destinations} = useFetch<Destination[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  // Computed filtered destinations based on the search term
  const filteredDestinations = computed(() => {
    if (!destinations.value) return []

    const lower = searchTerm.value.toLowerCase()
    return destinations.value.filter((d) => d.name.toLowerCase().includes(lower))
  })

  return { destinations, filteredDestinations, loading }
}
