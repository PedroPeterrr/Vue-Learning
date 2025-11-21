<script setup lang="ts">
import type { Book } from '@/type/type'

useHead({
  title: 'Books Management',
  meta: [
    { name: 'description', content: 'Management' },
    { property: 'og:title', content: 'User Dashboard' },
    { property: 'og:description', content: 'Search and view user details.' },
  ]
})

// Initialize composables
const { 
  books, 
  booksLoading, 
  booksError, 
  refresh, 
  submitBook, 
  deleteBook 
} = useBooks()

const { 
  validateForm, 
  clearFieldError, 
  createFormValidityChecker 
} = useFormValidation()

const { 
  bookModalState, 
  openBookModal, 
  closeBookModal 
} = useModal()

// Form data (reactive)
const form = ref({
  isbn: '',
  title: '',
  author_id: 1,
  publisher_id: 1,
  year_pub: new Date().getFullYear(),
  description: ''
})

// Form validation state
const formErrors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

// Handle clear field error
const handleClearFieldError = (field: string) => {
  if (formErrors.value[field]) {
    delete formErrors.value[field]
  }
}

// Create computed form validity checker
const isFormValid = createFormValidityChecker(form.value)

// Handle form data updates
const updateFormData = (newFormData: any) => {
  form.value = newFormData
  // Clear field errors - we'll handle this in the form component
}

// Handle form submission
const handleSubmit = async () => {
  const validation = validateForm(form.value)
  formErrors.value = validation.errors
  
  if (!validation.isValid) return

  isSubmitting.value = true

  try {
    const result = await submitBook(form.value)

    if (result.data) {
      // Reset the form on success
      form.value = {
        isbn: '',
        title: '',
        author_id: 1,
        publisher_id: 1,
        year_pub: new Date().getFullYear(),
        description: ''
      }
      formErrors.value = {}
      // Refresh the book list to show the new book
      refresh()
    }
  } finally {
    isSubmitting.value = false
  }
}

// Handle book selection
const handleBookSelect = (book: Book) => {
  openBookModal(book)
}

// Handle book deletion
const handleDeleteBook = async (isbn: string) => {
  const deleted = await deleteBook(isbn)
  if (deleted) {
    closeBookModal()
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
              <!-- Loading State -->
              <div v-if="booksLoading" class="flex items-center text-gray-600 ml-5">
                <LoadingSpinner message="Loading..." size="sm" color="text-gray-600" />
              </div>
              <!-- Refresh Button -->
              <button 
                v-else
                @click="refresh()" 
                class="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          <!-- Books Grid -->
          <div v-if="books && books.length > 0" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <BookCard
              v-for="book in books"
              :key="book.isbn"
              :book="book"
              @select="handleBookSelect"
            />
          </div>
          
          <!-- Error State -->
          <ErrorDisplay
            v-else-if="booksError"
            :error="booksError"
            :show-retry="true"
            :retry-function="refresh"
            title="Failed to load books"
            description="Unable to connect to the backend server"
            icon="⚠️"
          />
          
          <!-- Empty State -->
          <div v-else-if="!booksLoading" class="text-center py-8">
            <div class="text-gray-500 text-lg mb-2">📚</div>
            <p class="text-gray-600">No books found. Add your first book below!</p>
          </div>
        </div>
      </div>

      <!-- CREATE BOOK FORM SECTION -->
      <div>
        <div class="rounded-lg bg-gray-300 space-y-6 p-6">
          <h2 class="text-black text-xl">Add a New Book</h2>
          
          <BookForm
            :form-data="form"
            :form-errors="formErrors"
            :is-submitting="isSubmitting"
            :is-form-valid="isFormValid"
            @update:form-data="updateFormData"

            @submit="handleSubmit"
            @clear-field-error="handleClearFieldError"
          />
        </div>
      </div>
    </div>

    <!-- Book Details Modal -->
    <BookModal
      :book="bookModalState.selectedBook"
      :on-close="closeBookModal"
      :on-delete="handleDeleteBook"
    />
  </div>
</template>
