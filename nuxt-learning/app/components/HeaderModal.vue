<script setup lang="ts">
const props = defineProps<{ open: boolean }>()

  
const hovered = ref('')

const left = ref('10px')

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      // Open: animate to 40px
      setTimeout(() => {
        left.value = '40px'
      }, 50) // slight delay to allow transition
    } else {
      // Close: animate back to 5px
      left.value = '10px'
    }
  }
)

const items = [
  { name: 'Home', src: '/images/af.jpg' },
  { name: 'About', src: '/images/1.png' },
  { name: 'Destination', src: '/images/2.jpg' },
  { name: 'Users', src: '/images/3.png' }
]
</script>

<template>
  <Transition
    enter-active-class="transition duration-700 ease-out"
    leave-active-class="transition duration-700 ease-in"

    enter-from-class="opacity-0 scale-x-1"
    enter-to-class="opacity-100 scale-x-100"

    leave-from-class="opacity-100 scale-x-100"
    leave-to-class="opacity-0 scale-x-1"
  >
    <div
     v-show="open"
    class="origin-left absolute w-1/2 z-100 bg-red-500 px-15 transition-all duration-900 ease-in-out"
        :style="{ left: left }"
    >
      <div class="py-20"
            >
        <ul class="space-y-5">
            <li
              v-for="(item,index) in items"
              :key="item.name"
              class="flex items-center justify-between relative cursor-pointer"
              @mouseenter="hovered = item.name"
              @mouseleave="hovered = ''"
            >
               <p
                  class="z-100 text-5xl transition-colors duration-300 hover:text-white"
                >
                {{ item.name }}</p>
              <nuxt-img
                v-if="hovered === item.name"
                :src="item.src"
                width="250"
                height="300"
                class="transition-all duration-500 ease-in-out absolute top-[-50px] left-70"
                :class="{
                  'opacity-100 translate-y-0 rotate-[-10deg]': index % 2 === 0 && hovered === item.name,
                  'opacity-100 translate-y-0 rotate-10': index % 2 === 1 && hovered === item.name,
                  'translate-y-5': hovered !== item.name
                }"
              />
            </li>
        </ul>
      </div>

      <div class="flex justify-between">
        <div>
          <ul>
            <li>Game</li>
            <li>Movies</li>
            <li>Anime</li>
            <li>Character</li>
          </ul>
        </div>

        <div class="text-right py-8 mt-5">
          <p>Follow Us</p>
          <ul class="flex space-x-2">
            <li>Socials</li>
            <li>Logo</li>
            <li>Logo</li>
          </ul>
          <p>Copyright</p>
        </div>
      </div>
    </div>
  </Transition>
</template>