<script setup lang="ts">
import type { Destination } from '@/type/type'

useHead({
  title: 'Destination',
  meta: [
    { name: 'description', content: 'List of Destination with details.' },
    { property: 'og:title', content: 'User Dashboard' },
    { property: 'og:description', content: 'Search and view user details.' },
  ]
})

const search = ref('')
const { filteredDestinations, loading } = useDestinations(search)
const selected = ref<Destination | null>(null)

function viewDetails(dest: Destination) {
  selected.value = dest
}
function closeModal() {
  selected.value = null
}
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-extrabold text-center mb-10 text-blue-800 dark:text-blue-400">🌍 Destinations Dashboard</h1>

      <div class="flex justify-center mb-8">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Search destinations..."
          class="w-full sm:w-1/2 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white dark:bg-gray-700"
        />
      </div>

      <div v-if="loading" class="text-center text-gray-500 py-10">Loading destinations...</div>
      <p v-else-if="filteredDestinations.length === 0" class="text-center text-gray-500 mt-10 italic">
        No destinations found. Try a different search 🌴
      </p>

      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        <DestinationCard
          v-for="dest in filteredDestinations"
          :key="dest.id"
          :destination="dest"
          :onView="viewDetails"
        />
      </div>

      <DestinationModal :destination="selected" :onClose="closeModal" />
    </div>
  </main>
</template>
