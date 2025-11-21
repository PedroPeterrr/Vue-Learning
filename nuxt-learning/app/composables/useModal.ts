import type { Book } from '@/type/type'

interface BookModalState {
  showBookModal: boolean
  selectedBook: Book | null
}

interface SuccessModalState {
  showSuccessModal: boolean
}

export function useModal() {
  // Book modal state
  const bookModalState = reactive<BookModalState>({
    showBookModal: false,
    selectedBook: null
  })

  // Success modal state
  const successModalState = reactive<SuccessModalState>({
    showSuccessModal: false
  })

  // Book modal methods
  const openBookModal = (book: Book): void => {
    bookModalState.selectedBook = book
    bookModalState.showBookModal = true
  }

  const closeBookModal = (): void => {
    bookModalState.showBookModal = false
    bookModalState.selectedBook = null
  }

  // Success modal methods
  const showSuccessMessage = (): void => {
    successModalState.showSuccessModal = true
  }

  const hideSuccessMessage = (): void => {
    successModalState.showSuccessModal = false
  }

  // Generic modal state for any modal
  const createModalState = <T extends Record<string, any>>(initialState: T) => {
    const state = reactive({ ...initialState })
    const isOpen = ref(false)

    const openModal = (data?: Partial<T>) => {
      if (data) {
        Object.assign(state, data)
      }
      isOpen.value = true
    }

    const closeModal = (resetData?: T) => {
      isOpen.value = false
      if (resetData) {
        Object.assign(state, resetData)
      } else {
        Object.assign(state, initialState)
      }
    }

    return {
      state,
      isOpen,
      openModal,
      closeModal
    }
  }

  return {
    // Book modal state
    bookModalState,
    openBookModal,
    closeBookModal,
    
    // Success modal state
    successModalState,
    showSuccessMessage,
    hideSuccessMessage,
    
    // Generic modal creator
    createModalState
  }
}