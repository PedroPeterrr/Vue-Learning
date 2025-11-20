<script setup lang="ts">
import type { Destination } from '@/type/type';

const props = defineProps<{ destination: Destination | null; onClose: () => void }>()

const modalRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

watch(() => props.destination, async (val) => {
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
</script>

<template>
  <transition name="fade">
    <div
      v-if="destination"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        ref="modalRef"
        tabindex="-1"
        class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-11/12 sm:w-2/3 lg:w-1/2 animate-fade-in focus:outline-none"
      >
        <button @click="onClose" class="absolute top-3 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-3xl font-bold">&times;</button>

        <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-3">{{ destination.name }}</h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-700 dark:text-gray-300"><span class="font-semibold">📧 Email:</span> {{ destination.email }}</p>
            <p class="text-gray-700 dark:text-gray-300"><span class="font-semibold">📞 Phone:</span> {{ destination.phone }}</p>
          </div>
          <div>
            <p class="text-gray-700 dark:text-gray-300"><span class="font-semibold">🏙️ City:</span> {{ destination.address.city }}</p>
            <p class="text-gray-700 dark:text-gray-300"><span class="font-semibold">🏢 Company:</span> {{ destination.company.name }}</p>
          </div>
        </div>

        <p class="italic text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          “{{ destination.company.catchPhrase }}”
        </p>
      </div>
    </div>
  </transition>
</template>
