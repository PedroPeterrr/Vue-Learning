<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ location }}</p>
    <p>{{ email }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  location: String,
  email: String,
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  margin: 1rem auto;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
