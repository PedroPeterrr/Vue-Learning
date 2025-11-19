<script setup>
import { useStorage } from '@/composables/useStorage';

let anime = useStorage('anime')
let movie = useStorage('movie')
</script>

<template>
  <main>
    <p>
      What is your favorite Anime? <input type="text" v-model="anime">
    </p>

     <p>
      What is your favorite Movie? <input type="text" v-model="movie">
    </p>
  </main>
</template>