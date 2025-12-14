<template>
  <section class="">
    <h1>Hello</h1>

    <div class="border flex space-x-2.5">
      <div>
        <h3>Games</h3>
      </div>

      <div class="grid grid-cols-3 gap-2.5">
        <div class="border px-5 py-2  w-[300px] relative flex gap-2">
          <nuxt-img 
            src="/images/123.png"
            width="25"
            height="25"
            class="absolute left-0 top-1 z-10"
          />
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/af.jpg"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div class="flex flex-col">
            <p>Valorant</p>
            <p>2025</p>
          </div>
        </div>

        <div class="border px-5 py-2 w-[300px] relative flex gap-2">
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/2.jpg"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div class="flex flex-col">
            <p>League of Legends</p>
            <p>2025</p>
          </div>
        </div>

        <div  class="border px-5 py-2 w-[300px] relative flex gap-2">
          <nuxt-img 
            src="/images/123.png"
            width="25"
            height="25"
            class="absolute left-0 top-1 z-10"
          />
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/3.png"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="flex flex-col">
            <p>Team Fight Tactics</p>
            <p>2025</p>
          </div>
        </div>

        <div  class="border px-5 py-2 w-[300px] relative flex gap-2">
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/3.png"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="flex flex-col">
            <p>Team Fight Tactics</p>
            <p>2025</p>
          </div>
        </div>
      </div>
    </div>

    <div class="border flex space-x-2.5">
      <div>
        <h3>Anime</h3>
      </div>

      <div class="grid grid-cols-3 gap-2.5">
        <div class="border px-5 py-2  w-[300px] relative flex gap-2">
          <nuxt-img 
            src="/images/123.png"
            width="25"
            height="25"
            class="absolute left-0 top-1 z-10"
          />
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/af.jpg"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="flex flex-col">
            <p>Dragon Ball</p>
            <p>2021</p>
          </div>
        </div>

        <div  class="border px-5 py-2 w-[300px] relative flex gap-2">
          <nuxt-img 
            src="/images/123.png"
            width="25"
            height="25"
            class="absolute left-0 top-1 z-10"
          />
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/2.jpg"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="flex flex-col">
            <p>Reborn</p>
            <p>2011</p>
          </div>
        </div>

        <div  class="border px-5 py-2 w-[300px] relative flex gap-2">
          <div class="w-[100px] h-[100px] overflow-hidden">
            <nuxt-img
              src="/images/3.png"
              width="100"
              height="100"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="flex flex-col">
            <p>Naruto</p>
            <p>2020</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>