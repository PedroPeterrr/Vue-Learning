<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{ menuOpen: boolean }>()
defineEmits(['toggle'])

const route = useRoute()
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY >= 5
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

/**
 * Header styling logic
 * - On "/" → no border & no margin until scrolled 250px
 * - Other routes → always bordered
 */
const headerClasses = computed(() => {
  if (route.path === '/') {
    return scrolled.value
      ? 'border-4 my-4 shadow-xl mx-10'
      : 'border-0 my-0 shadow-none mx-10'
  }

  return 'border-4 my-4 shadow-xl mx-10'
})
</script>


<template>
    <header   :class="[
    'flex px-5 py-4  sticky top-4 justify-between items-center transition-all duration-300',
    headerClasses
  ]">
        <button
            id="hamburgerMenuButton"
            @click="$emit('toggle')"
            class="flex flex-col justify-center items-center
                w-5 h-5 bg-transparent
                border-none cursor-pointer
                focus:outline-none gap-1 "
            aria-label="Toggle menu"
        >
            <!-- top bar -->
            <span
                :class="[
                    'hamburgerMenuButton-bar',
                    menuOpen
                    ? 'rotate-45 translate-x-[3px] translate-y-[3px]'
                    : 'rotate-0 translate-x-0 translate-y-0'
                ]"
            />

            <!-- bottom bar -->
            <span
                :class="[
                    'hamburgerMenuButton-bar',
                    menuOpen
                    ? '-rotate-45 translate-x-[3px] -translate-y-[3px]'
                    : 'rotate-0 translate-x-0 translate-y-0'
                ]"
            />
        </button>

        <h1>Logo</h1>

        <ul class="flex space-x-10">
            <li>
                <a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </header>
</template>


<style scoped>
.hamburgerMenuButton-bar {
  width: 20px;
  height: 2px;
  background-color: currentColor;
  transition: transform 0.3s ease;
}
</style>