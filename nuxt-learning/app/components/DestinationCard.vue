<script setup lang="ts">
import type { Destination } from '@/type/type';

defineProps<{
  destination: Destination
  onView: (dest: Destination) => void
}>()
</script>

<template>
  <div
    @click="onView(destination)"
    class="cursor-pointer group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all w-full max-w-sm"
  >
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
        {{ destination.name }}
      </h2>
      <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
        {{ destination.address.city }}
      </span>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">📧 {{ destination.email }}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">☎️ {{ destination.phone }}</p>

    <button
      @click.stop="onView(destination)"
      class="mt-4 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-400 transition"
    >
      View Details
    </button>
  </div>
</template>
