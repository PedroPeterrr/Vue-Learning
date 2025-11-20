<script setup lang="ts">
import type { Book } from '@/type/type';

const props = defineProps<{ 
  book: Book | null
  onClose: () => void 
  onDelete: (isbn: string) => void
}>()

const modalRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

watch(() => props.book, async (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    lastFocused = document.activeElement as HTMLElement
    await nextTick()
    modalRef.value?.focus()
  } else {
    document.body.style.overflow = ''
    lastFocused?.focus()
  }
})

const handleClose = () => {
  props.onClose()
}

const formatBookId = (id: number | null, type: string) => {
  if (!id) return `Unknown ${type}`
  return `${type} #${id}`
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="book"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click="handleClose"
    >
      <div
        ref="modalRef"
        tabindex="-1"
        class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-11/12 sm:w-2/3 lg:w-1/2 max-w-2xl animate-fade-in focus:outline-none"
        @click.stop
      >
        <button 
          @click="handleClose" 
          class="absolute top-3 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-3xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div class="mb-6">
          <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">{{ book.title }}</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">{{ book.year_pub }} • ISBN: {{ book.isbn }}</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Book Details</h3>
              <div class="space-y-2 text-sm">
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">📚 ISBN:</span> {{ book.isbn }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">📅 Published:</span> {{ book.year_pub }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">👤 {{ formatBookId(book.author_id, 'Author') }}</span>
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">🏢 {{ formatBookId(book.publisher_id, 'Publisher') }}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {{ book.description || 'No description available for this book.' }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="props.onDelete(book.isbn)"
            class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md mr-3 transition duration-200"
          >
            Delete
          </button>

          <button
            @click="handleClose"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>