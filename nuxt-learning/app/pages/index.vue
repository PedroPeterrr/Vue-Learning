<script lang="ts" setup>
  import { useHead } from '#app'
  
  useHead({
    title: 'Laravel Stats Dashboard',
    meta: [
      { name: 'description', content: 'View total series and lessons from Laravel backend.' },
      { property: 'og:title', content: 'Laravel Stats Dashboard' },
      { property: 'og:description', content: 'View total series and lessons from Laravel backend.' },
    ],
  })
  
  
  const { series, lessons } = useStats()
</script>

<template>
  <div class="bg-black/40 h-screen grid place-items-center">
    <div>
      <h1 class="text-white text-2xl mb-4">Laravel Stats</h1>
        <StatsCard :series="series" :lessons="lessons" />
    </div>
  </div>
</template>
