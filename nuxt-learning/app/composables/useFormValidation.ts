import type { Ref } from 'vue'

interface ValidationRule {
  (value: any): string
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation() {
  // Validation rules
  const validationRules: ValidationRules = {
    isbn: (value: string) => !value?.trim() ? 'ISBN is required' : '',
    title: (value: string) => !value?.trim() ? 'Title is required' : '',
    author_id: (value: number) => !value || value <= 0 ? 'Valid author ID is required' : '',
    publisher_id: (value: number | null) => value === null || value <= 0 ? 'Valid publisher ID is required' : '',
    year_pub: (value: number) => {
      const currentYear = new Date().getFullYear()
      return !value || value < 1000 || value > currentYear + 1 
        ? `Year must be between 1000 and ${currentYear + 1}`
        : ''
    },
    description: (value: string) => '' // Optional field, no validation needed
  }

  // Validate entire form
  const validateForm = (formData: Record<string, any>, rules: ValidationRules = validationRules): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {}
    let isValid = true

    // Check each field against its validation rule
    Object.keys(rules).forEach(field => {
      const rule = rules[field]
      if (rule) {
        const error = rule(formData[field])
        if (error) {
          errors[field] = error
          isValid = false
        }
      }
    })

    return { isValid, errors }
  }

  // Validate single field
  const validateField = (field: string, value: any, rules: ValidationRules = validationRules): string => {
    const rule = rules[field]
    return rule ? rule(value) : ''
  }

  // Clear specific field error
  const clearFieldError = (errors: Ref<ValidationErrors>, field: string): void => {
    if (errors.value[field]) {
      delete errors.value[field]
    }
  }

  // Create computed form validity checker
  const createFormValidityChecker = (formData: Record<string, any>) => {
    return computed(() => {
      return formData.isbn?.trim() && 
             formData.title?.trim() && 
             formData.author_id > 0 &&
             (formData.publisher_id === null || formData.publisher_id > 0) &&
             formData.year_pub >= 1000 &&
             formData.year_pub <= new Date().getFullYear() + 1
    })
  }

  return {
    validationRules,
    validateForm,
    validateField,
    clearFieldError,
    createFormValidityChecker
  }
}