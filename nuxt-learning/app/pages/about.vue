<script setup lang="ts">
import type { Book } from '@/type/type'
import Swal from 'sweetalert2'

useHead({
  title: 'Books Management',
  meta: [
    { name: 'description', content: 'Management' },
    { property: 'og:title', content: 'User Dashboard' },
    { property: 'og:description', content: 'Search and view user details.' },
  ]
})

// GET books with timeout and error handling
const { data: books, refresh, pending: booksLoading, error: booksError } = useAsyncData<Book[]>(
  'books',
  () => $fetch('http://localhost:8000/api/books', {
    timeout: 5000, // 5 second timeout
    retry: 1,
    retryDelay: 500,
    onRequestError({ error }) {
      console.error('Request failed:', error)
    },
    onResponseError({ response }) {
      console.error('Response error:', response.status)
    }
  }),
  {
    server: false, // Only fetch on client side to prevent SSR blocking
    lazy: true, // Don't block component rendering
  }
)

// Form data (reactive)
const form = ref({
  isbn: '',
  title: '',
  author_id: 1,
  publisher_id: 1,
  year_pub: new Date().getFullYear(),
  description: ''
})

// Form validation
const formErrors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

// Modal states
const showSuccessModal = ref(false)
const showBookModal = ref(false)
const selectedBook = ref<Book | null>(null)

// Validation rules
const validationRules = {
  isbn: (value: string) => !value.trim() ? 'ISBN is required' : '',
  title: (value: string) => !value.trim() ? 'Title is required' : '',
  author_id: (value: number) => !value || value <= 0 ? 'Valid author ID is required' : '',
  publisher_id: (value: number | null) => value === null || value <= 0 ? 'Valid publisher ID is required' : '',
  year_pub: (value: number) => {
    const currentYear = new Date().getFullYear()
    return !value || value < 1000 || value > currentYear + 1 
      ? `Year must be between 1000 and ${currentYear + 1}`
      : ''
  },
  description: (value: string) => ''
}

// Validate form
const validateForm = () => {
  const errors: Record<string, string> = {}
  let isValid = true

  // Check ISBN
  const isbnError = validationRules.isbn(form.value.isbn)
  if (isbnError) {
    errors.isbn = isbnError
    isValid = false
  }

  // Check title
  const titleError = validationRules.title(form.value.title)
  if (titleError) {
    errors.title = titleError
    isValid = false
  }

  // Check author_id
  const authorError = validationRules.author_id(form.value.author_id)
  if (authorError) {
    errors.author_id = authorError
    isValid = false
  }

  // Check publisher_id
  const publisherError = validationRules.publisher_id(form.value.publisher_id)
  if (publisherError) {
    errors.publisher_id = publisherError
    isValid = false
  }

  // Check year_pub
  const yearError = validationRules.year_pub(form.value.year_pub)
  if (yearError) {
    errors.year_pub = yearError
    isValid = false
  }

  formErrors.value = errors
  return isValid
}

// Clear specific field error
const clearFieldError = (field: string) => {
  if (formErrors.value[field]) {
    delete formErrors.value[field]
  }
}

// Form submission state
const isFormValid = computed(() => {
  return form.value.isbn.trim() && 
         form.value.title.trim() && 
         form.value.author_id > 0 &&
         (form.value.publisher_id === null || form.value.publisher_id > 0) &&
         form.value.year_pub >= 1000 &&
         form.value.year_pub <= new Date().getFullYear() + 1
})

// POST function with timeout handling
const submitBook = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const { error } = await useFetch('http://localhost:8000/api/books', {
      method: 'POST',
      body: form.value,
      timeout: 10000, // 10 second timeout for POST requests
      retry: 0, // Don't retry POST requests
      onRequestError({ error }) {
        console.error('Request failed:', error)
      }
    })

    if (error.value) {
      console.error('Error creating book:', error.value)

      // Check if validation error for ISBN exists
      const isbnError = error.value?.data?.errors?.isbn?.[0]
      if (isbnError) {
        Swal.fire({
          icon: 'error',
          title: 'Duplicate ISBN',
          text: isbnError, // Shows Laravel's exact message
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to create book! Please check if the backend server is running.',
        })
      }
      return
    }

    // Refresh books after POST
    await refresh()

    // Reset the form
    form.value = {
      isbn: '',
      title: '',
      author_id: 1,
      publisher_id: 1,
      year_pub: new Date().getFullYear(),
      description: ''
    }

    // Show SweetAlert2 success modal
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Book created successfully!',
      timer: 2000,
      showConfirmButton: false
    })

  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Connection Error',
      text: 'Unable to connect to the server. Please check if the backend is running.',
    })
  } finally {
    isSubmitting.value = false
  }
}

const openBookModal = (book: Book) => {
  selectedBook.value = book
  showBookModal.value = true
}

const closeBookModal = () => {
  showBookModal.value = false
  selectedBook.value = null
}

const deleteBook = async (isbn: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to undo this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      const { error } = await useFetch(`http://localhost:8000/api/books/${isbn}`, { 
        method: 'DELETE',
        timeout: 5000, // 5 second timeout
      })
      
      if (error.value) {
        Swal.fire('Error!', 'Failed to delete the book. Please check if the backend is running.', 'error')
        return
      }
      
      Swal.fire('Deleted!', 'The book has been deleted.', 'success')
      refresh()
      selectedBook.value = null
    } catch (err) {
      console.error('Delete error:', err)
      Swal.fire('Error!', 'Unable to connect to the server.', 'error')
    }
  }
}
</script>

<template>
  <div class="bg-black/40 min-h-screen place-items-center p-4">
    <h1 class="text-black text-2xl font-bold mb-5">Books Management</h1>
    <div class=" w-full max-w-4xl flex gap-10 mt-10">
      <!-- BOOK LIST SECTION -->
      <div>
        <div class="rounded-lg bg-gray-300 space-y-6 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-black text-xl">Book Collection</h2>
            <div class="flex items-center space-x-2">
              <div v-if="booksLoading" class="flex items-center text-gray-600 ml-5">
                <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
              <button 
                @click="refresh()" 
                class="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
                v-else
              >
                Refresh
              </button>
            </div>
          </div>

          <div v-if="books && books.length > 0" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="book in books"
              :key="book.isbn"
              @click="openBookModal(book)"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300 hover:scale-105"
            >
              <div class="p-4">
                <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">{{ book.title }}</h3>
                <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p class="flex items-center">
                    <span class="mr-2">📅</span>
                    {{ book.year_pub }}
                  </p>
                  <p class="flex items-center">
                    <span class="mr-2">📚</span>
                    ISBN: {{ book.isbn }}
                  </p>
                  <p class="flex items-center">
                    <span class="mr-2">👤</span>
                    Author ID: {{ book.author_id }}
                  </p>
                </div>
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">Click to view details →</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="booksError" class="text-center py-8">
            <div class="text-red-500 text-lg mb-2">⚠️</div>
            <p class="text-red-600 font-medium mb-1">Failed to load books</p>
            <p class="text-gray-600 text-sm mb-3">Unable to connect to the backend server</p>
          </div>
          <div v-else-if="!booksLoading" class="text-center py-8">
            <div class="text-gray-500 text-lg mb-2">📚</div>
            <p class="text-gray-600">No books found. Add your first book below!</p>
          </div>
        </div>
      </div>

      <div>
        <!-- CREATE BOOK FORM SECTION -->
        <div class="rounded-lg bg-gray-300 space-y-6 p-6 ">
          <h2 class="text-black text-xl">Add a New Book</h2>

          <form @submit.prevent="submitBook" class="space-y-4">
            <!-- ISBN Field -->
            <div>
              <label for="isbn" class="block text-black text-sm font-medium mb-1">ISBN *</label>
              <input 
                id="isbn" 
                v-model="form.isbn" 
                @input="clearFieldError('isbn')"
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
                v-model="form.title" 
                @input="clearFieldError('title')"
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
                  v-model.number="form.author_id" 
                  @input="clearFieldError('author_id')"
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
                  v-model.number="form.publisher_id" 
                  @input="clearFieldError('publisher_id')"
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
                v-model.number="form.year_pub" 
                @input="clearFieldError('year_pub')"
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
                v-model="form.description" 
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
        </div>
      </div>
    </div>

    <!-- Book Details Modal -->
    <BookModal
      :book="selectedBook"
      :on-close="closeBookModal"
      :onDelete="deleteBook"
    />
  </div>
</template>
