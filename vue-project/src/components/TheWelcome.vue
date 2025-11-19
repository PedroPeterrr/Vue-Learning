<script setup>
import { useStorage } from '@/composables/useStorage';
import { useCounterStore  } from '@/store/CounterStore';

let counter = useCounterStore();

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

    <p>{{ counter.count }}</p>

    <button
      :disabled="!counter.remaining"
     @click="counter.increment()"
     >Increment ({{  counter.remaining }} remaining)</button>
  </main>
</template>