<script setup lang="ts">
import type { Book } from '@/type/type'
interface Props {
  book: Book
}

interface Emits {
  (e: 'select', book: Book): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('select', props.book)
}
</script>

<template>
  <div
    @click="handleClick"
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300 hover:scale-105"
  >
    <div class="p-4">
      <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
        {{ book.title }}
      </h3>
      <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <p class="flex items-center">
          <span class="mr-2">📅</span>
          {{ book.year_pub }}
        </p>
        <p class="flex items-center">
          <span class="mr-2">📚</span>
          ISBN: {{ book.isbn }}
        </p>
        <p class="flex items-center">
          <span class="mr-2">👤</span>
          Author ID: {{ book.author_id }}
        </p>
      </div>
      <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">Click to view details →</p>
      </div>
    </div>
  </div>
</template>