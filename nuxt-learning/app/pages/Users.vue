<script setup lang="ts">
import type { UserData } from '@/type/type'

useSeoMeta({
  title: 'User Dashboard',
  description: 'List of users with details.',
  ogTitle: 'User Dashboard',
  ogDescription: 'Search and view user details.',
})

const search = ref('')
const { filteredUsers } = useUserData(search);
const selectedUser = ref<UserData | null>(null)
const closeBtn = ref()

watch(selectedUser, (newVal) => {
  if (newVal) {
    nextTick(() => {
      closeBtn.value?.focus()
    })
  }
})

</script>

<template>
  <section class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-7xl">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">User Dashboard</h1>

      <div class="mb-8">
        <label for="search-input" class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
        <input
          id="search-input"
          v-model="search"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Search users by name, username, or email..."
          aria-describedby="search-help"
        />
        <p id="search-help" class="mt-1 text-sm text-gray-500">Type to filter the user list below.</p>
      </div>

      <div v-if="filteredUsers.length === 0" class="text-center py-12">
        <p class="text-lg text-gray-600">No users found matching your search.</p>
        <p class="text-sm text-gray-500 mt-2">Try adjusting your search terms.</p>
      </div>

      <div v-else class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="user in filteredUsers"
          :key="user.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 hover:scale-105 transform transition-transform duration-300"
          tabindex="0"
          role="article"
          :aria-labelledby="`user-name-${user.id}`"
        >
          <header class="mb-4">
            <h2 :id="`user-name-${user.id}`" class="text-xl font-semibold text-gray-900">{{ user.name }}</h2>
            <p class="text-sm text-gray-600">@{{ user.username }}</p>
          </header>

          <section class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Contact</h3>
            <p class="text-gray-900">{{ user.email }}</p>
          </section>

          <footer class="mt-4">
            <button
              @click="selectedUser = user"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View details for {{ user.name }}"
            >
              View Details
            </button>
          </footer>
        </article>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div v-if="selectedUser" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="selectedUser = null" @keydown.esc="selectedUser = null">
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 id="modal-title" class="text-xl font-semibold text-gray-900">{{ selectedUser.name }}</h2>
        <button
          ref="closeBtn"
          @click="selectedUser = null"
          class="text-gray-400 hover:text-gray-600 transition duration-200"
          aria-label="Close user details modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </header>
      <div class="p-6">
        <section class="mb-4">
          <h3 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Username</h3>
          <p class="text-gray-900">@{{ selectedUser.username }}</p>
        </section>
        <section class="mb-4">
          <h3 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Contact</h3>
          <p class="text-gray-900">{{ selectedUser.email }}</p>
        </section>
        <section class="mb-4">
          <h3 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Address</h3>
          <p class="text-gray-900">{{ selectedUser.address.street }}, {{ selectedUser.address.suite }}</p>
          <p class="text-gray-900">{{ selectedUser.address.city }}, {{ selectedUser.address.zipcode }}</p>
          <p class="text-xs text-gray-500">Coordinates: {{ selectedUser.address.geo.lat }}, {{ selectedUser.address.geo.lng }}</p>
        </section>
        <section>
          <h3 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Company</h3>
          <p class="text-gray-900 font-medium">{{ selectedUser.company.name }}</p>
          <p class="text-sm text-gray-600 italic">{{ selectedUser.company.catchPhrase }}</p>
          <p class="text-xs text-gray-500">{{ selectedUser.company.bs }}</p>
        </section>
      </div>
    </div>
  </div>
</template>