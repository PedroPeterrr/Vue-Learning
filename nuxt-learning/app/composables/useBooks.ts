import type { Book } from '@/type/type'

interface ApiResponse<T = any> {
  data?: T
  error?: any
}

export function useBooks() {
  const API_BASE = 'http://localhost:8000/api'

  // GET books with timeout and error handling
  const { data: books, refresh, pending: booksLoading, error: booksError } = useAsyncData<Book[]>(
    'books',
    () => $fetch<Book[]>(`${API_BASE}/books`, {
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

  // POST book with timeout handling
  const submitBook = async (formData: Book): Promise<ApiResponse<Book>> => {
    try {
      const { data, error } = await useFetch<Book>(`${API_BASE}/books`, {
        method: 'POST',
        body: formData,
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
          alert('Duplicate ISBN\n' + isbnError);
        } else {
          alert('Oops...\nFailed to create book! Please check if the backend server is running.');
        }
        
        return { error: error.value }
      }

      // Show success modal
      alert('Success!\nBook created successfully!')

      return { data: data.value }
    } catch (err) {
      console.error(err)
      alert('Connection Error\nUnable to connect to the server. Please check if the backend is running.')
      return { error: err }
    }
  }

  // DELETE book
  const deleteBook = async (isbn: string): Promise<boolean> => {
    const result = confirm('Are you sure?\nYou won\'t be able to undo this!')

    if (result) {
      try {
        const { error } = await useFetch(`${API_BASE}/books/${isbn}`, { 
          method: 'DELETE',
          timeout: 5000, // 5 second timeout
        })
        
        if (error.value) {
          alert('Error!\nFailed to delete the book. Please check if the backend is running.')
          return false
        }

        alert('Deleted!\nThe book has been deleted.')
        await refresh()
        return true
      } catch (err) {
        console.error('Delete error:', err)
        alert('Error!\nUnable to connect to the server.')
        return false
      }
    }
    
    return false
  }

  return {
    books,
    booksLoading,
    booksError,
    refresh,
    submitBook,
    deleteBook
  }
}