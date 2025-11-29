<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 1 page" />

      <!-- Button to take a picture -->
      <ion-button @click="takePhoto">Take Photo</ion-button>

      <!-- Display the photo -->
      <div v-if="photo">
        <img :src="photo" width="100" height="100" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const photo = ref<string | null>(null);

const takePhoto = async () => {
  const perm = await Camera.checkPermissions();
  if (perm.camera !== 'granted') {
    await Camera.requestPermissions({ permissions: ['camera'] });
  }

  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera
  });

  photo.value = image.dataUrl || null;
};

</script>

<style scoped>
img {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>