<script setup lang="ts">

interface Props {
  title?: string
  text?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
  icon?: 'warning' | 'question' | 'info' | 'success' | 'error'
}

interface Emits {
  (e: 'confirmed'): void
  (e: 'cancelled'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Are you sure?',
  text: "You won't be able to undo this!",
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel',
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  icon: 'warning'
})

const emit = defineEmits<Emits>()

const showConfirmation = async (): Promise<boolean> => {
  const result = confirm(props.title + '\n' + props.text)

  if (result) {
    emit('confirmed')
    return true
  } else {
    emit('cancelled')
    return false
  }
}

// Expose the method so parent components can call it
defineExpose({
  showConfirmation
})
</script>

<template>
  <!-- This component doesn't render anything visible -->
  <!-- It only provides the confirmation dialog functionality -->
  <div></div>
</template>