<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import PersonCard from './components/PersonCard.vue'

import { Camera, CameraResultType } from '@capacitor/camera'

const photo = ref(null)

async function openCamera() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    })
    photo.value = image.dataUrl
  } catch (err) {
    console.error('Camera error:', err)
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
    <PersonCard name="John Doe" location="New York" email="john@gmail.com" />

    <section class="camera-section">
      <h2>Camera Demo</h2>
      <button @click="openCamera">Open Camera</button>
      <div v-if="photo">
        <img :src="photo" alt="Captured photo" width="320" height="240" />
      </div>
    </section>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.camera-section {
  margin-top: 2rem;
  text-align: center;
}

.camera-section button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
