<script setup lang="ts">
interface Props {
  error: Error | string | null
  showRetry?: boolean
  retryFunction?: () => void
  title?: string
  description?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  showRetry: true,
  title: 'Something went wrong',
  description: 'Unable to load the requested information',
  icon: '⚠️'
})

</script>

<template>
  <div class="text-center py-8">
    <div class="text-red-500 text-lg mb-2">{{ icon }}</div>
    <p class="text-red-600 font-medium mb-1">{{ title }}</p>
    <p class="text-gray-600 text-sm mb-3">{{ description }}</p>
  </div>
</template>