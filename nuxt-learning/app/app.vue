<template>
  <div class="min-h-screen  mx-15">
      <!-- <Header :menuOpen="menuOpen" @toggle="menuOpen = !menuOpen" />
      <HeaderModal :open="menuOpen"/>    -->
    <!-- <NavBar class="sticky top-0" /> -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

  const menuOpen = ref(false)
// Usually empty unless you want global logic
</script>
