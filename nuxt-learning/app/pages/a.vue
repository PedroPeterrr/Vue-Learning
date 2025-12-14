<script setup lang="ts">

interface Items {
  title: string
  year: number
  image: string
  badge?: boolean
  details?: string
} 

interface Categories {
  name: string
  details?: string
  items: Items[]
}

const categories: Categories[] = [
  {
    name: 'Games',
    details: 'MMORPGs, FPShoots & Mobile',
    items: [
      {
        title: 'Valorant',
        year: 2025,
        image: '/images/af.jpg',
        badge: true
      },
      {
        title: 'League of Legends',
        year: 2025,
        image: '/images/af.jpg',
      },
      {
        title: 'TFT',
        year: 2025,
        image: '/images/3.png',
        badge: true
      }
    ]
  },
  {
    name: 'Anime',
    items: [
      {
        title: 'Dragon Ball',
        year: 2021,
        image: '/images/af.jpg',
        details: 'homemade buns, secret sause, 125g pure beef patty, American cheese, tomato, iceberg lettuce'
      },
      {
        title: 'Reborn',
        year: 2011,
        image: '/images/1.png',
        badge: true
      },
      {
        title: 'Adobo Fried Rice',
        year: 2020,
        image: '/images/3.png'
      },
      {
        title: 'Rotisserie Organic Chicken',
        year: 2020,
        image: '/images/3.png'
      }
    ]
  }
]
</script>

<template>
  <section class="space-y-1 m-5 w-full">
    <h1 class="text-4xl">Categories</h1>
    <hr class="my-5"/>
    <div
      v-for="(category, cIndex) in categories"
      :key="cIndex"
      class="flex gap-15 items-start"
    >
    <!-- Category Title -->

      <div class="flex flex-col  w-[200px]">
        <h3 class="text-lg font-semibold shrink-0 pt-2">
          {{ category.name }}
        </h3>

        <h4 class="text-sm mt-2"> {{ category.details }} </h4>
      </div>

    <!-- Items -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-1 ">
        <div
          v-for="(item, iIndex) in category.items"
          :key="iIndex"
          class="relative flex gap-3 p-3 w-[330px]"
        >
          <!-- Optional badge -->
          <nuxt-img
            v-if="item.badge"
            src="/images/123.png"
            width="15"
            height="15"
            class="absolute top-2 -left-1 z-10"
          />

          <!-- Image -->
          <div class="w-25 h-25 overflow-hidden shrink-0">
            <nuxt-img
              :src="item.image"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          <!-- Text -->
          <div class="flex flex-col">
            <p class="font-medium leading-tight text-lg">{{ item.title }}</p>
            <p class="text-sm text-gray-500">{{ item.year }}</p>
            <p class="text-xs">{{ item.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
