<script setup lang="ts">
const props = defineProps<{
  type: 'series' | 'lesson',
  modelValue: string,
}>();

const emit = defineEmits(['update:modelValue', 'close', 'submit']);

const onSubmit = () => {
  if (!props.modelValue.trim()) return;
  emit('submit');
  emit('update:modelValue', '');
};

</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-gray-800 rounded-lg p-6 w-96">
      <h3 class="text-xl font-bold text-white mb-4">
        Add {{ props.type === 'series' ? 'Series' : 'Lesson' }}
      </h3>

      <input
        type="text"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white mb-4"
        placeholder="Enter title"
      />

      <div class="flex justify-end gap-2">
        <button
          class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          class="px-4 py-2 rounded bg-green-800 hover:bg-green-900 text-white"
          @click="onSubmit"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
