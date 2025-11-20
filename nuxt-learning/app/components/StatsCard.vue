<template>
  <ul class="text-white">
    <li><strong>Total Series:</strong> {{ series ?? 'Loading...' }}</li>
    <li><strong>Total Lessons:</strong> {{ lessons ?? 'Loading...' }}</li>
  </ul>
</template>

<script lang="ts" setup>
interface Props {
  series: number | string | null
  lessons: number | string | null
}

const props = defineProps<Props>()
</script>
