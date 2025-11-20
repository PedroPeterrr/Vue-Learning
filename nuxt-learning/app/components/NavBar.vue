<template>
  <nav class="bg-gray-800 text-white p-4 flex gap-4">
    <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
    <NuxtLink to="/about" class="hover:underline">About Me</NuxtLink>
    <NuxtLink to="/DestinationList" class="hover:underline">Destination</NuxtLink>
    <NuxtLink to="Users" class="hover:underline">Users List</NuxtLink>
  </nav>
</template>

<script setup>
// no JS needed for static links
</script>

<style scoped>
nav a {
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}
</style>
