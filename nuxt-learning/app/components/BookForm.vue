<script setup lang="ts">
import type { Book } from '@/type/type'

interface FormErrors {
  [key: string]: string
}

interface Props {
  formData: Book
  formErrors: FormErrors
  isSubmitting: boolean
  isFormValid: boolean
}

interface Emits {
  (e: 'update:formData', data: Book): void
  (e: 'update:formErrors', errors: FormErrors): void
  (e: 'submit'): void
  (e: 'clear-field-error', field: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Handle form data updates
const updateFormData = (field: string, value: any) => {
  emit('update:formData', {
    ...props.formData,
    [field]: value
  })
  // Clear field error when user starts typing
  emit('clear-field-error', field)
}

// Handle form submission
const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- ISBN Field -->
    <div>
      <label for="isbn" class="block text-black text-sm font-medium mb-1">ISBN *</label>
      <input 
        id="isbn" 
        :value="formData.isbn"
        @input="updateFormData('isbn', ($event.target as HTMLInputElement).value)"
        type="text" 
        placeholder="Enter ISBN"
        class="w-full p-3 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="formErrors.isbn ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'"
      />
      <p v-if="formErrors.isbn" class="text-red-600 text-sm mt-1">{{ formErrors.isbn }}</p>
    </div>

    <!-- Title Field -->
    <div>
      <label for="title" class="block text-black text-sm font-medium mb-1">Title *</label>
      <input 
        id="title" 
        :value="formData.title"
        @input="updateFormData('title', ($event.target as HTMLInputElement).value)"
        type="text" 
        placeholder="Enter book title"
        class="w-full p-3 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="formErrors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'"
      />
      <p v-if="formErrors.title" class="text-red-600 text-sm mt-1">{{ formErrors.title }}</p>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <!-- Author ID Field -->
      <div>
        <label for="author_id" class="block text-black text-sm font-medium mb-1">Author ID *</label>
        <input 
          id="author_id" 
          :value="formData.author_id"
          @input="updateFormData('author_id', parseInt(($event.target as HTMLInputElement).value) || 0)"
          type="number" 
          placeholder="Enter author ID"
          min="1"
          class="w-full p-3 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="formErrors.author_id ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'"
        />
        <p v-if="formErrors.author_id" class="text-red-600 text-sm mt-1">{{ formErrors.author_id }}</p>
      </div>

      <!-- Publisher ID Field -->
      <div>
        <label for="publisher_id" class="block text-black text-sm font-medium mb-1">Publisher ID *</label>
        <input 
          id="publisher_id" 
          :value="formData.publisher_id"
          @input="updateFormData('publisher_id', parseInt(($event.target as HTMLInputElement).value) || 0)"
          type="number" 
          placeholder="Enter publisher ID"
          min="1"
          class="w-full p-3 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="formErrors.publisher_id ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'"
        />
        <p v-if="formErrors.publisher_id" class="text-red-600 text-sm mt-1">{{ formErrors.publisher_id }}</p>
      </div>
    </div>

    <!-- Year Published Field -->
    <div>
      <label for="year_pub" class="block text-black text-sm font-medium mb-1">Year Published *</label>
      <input 
        id="year_pub" 
        :value="formData.year_pub"
        @input="updateFormData('year_pub', parseInt(($event.target as HTMLInputElement).value) || 0)"
        type="number" 
        :placeholder="`Enter year (${new Date().getFullYear()})`"
        :min="1000"
        :max="new Date().getFullYear() + 1"
        class="w-full p-3 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="formErrors.year_pub ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'"
      />
      <p v-if="formErrors.year_pub" class="text-red-600 text-sm mt-1">{{ formErrors.year_pub }}</p>
    </div>

    <!-- Description Field -->
    <div>
      <label for="description" class="block text-black text-sm font-medium mb-1">Description</label>
      <textarea 
        id="description" 
        :value="formData.description"
        @input="updateFormData('description', ($event.target as HTMLTextAreaElement).value)"
        placeholder="Enter book description (optional)"
        rows="3"
        class="w-full p-3 rounded border border-gray-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button 
      type="submit" 
      :disabled="!isFormValid || isSubmitting"
      class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
    >
      <svg v-if="isSubmitting" class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ isSubmitting ? 'Adding Book...' : 'Add Book' }}
    </button>
  </form>
</template>