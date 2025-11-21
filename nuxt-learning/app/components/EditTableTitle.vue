<script setup lang="ts">

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue', 'save', 'delete']);

const local = ref(props.modelValue);
const originalValue = ref(props.modelValue);
const isEditing = ref(false);

// Two-way binding
watch(local, val => emit('update:modelValue', val));

// Watch for prop changes to update local value and original value
watch(() => props.modelValue, (newValue) => {
  local.value = newValue;
  originalValue.value = newValue;
});

const startEditing = () => {
  isEditing.value = true;
  originalValue.value = local.value;
};

const handleSave = () => {
  if (local.value.trim()) {
    emit('save', local.value.trim());
    isEditing.value = false;
    originalValue.value = local.value.trim();
  }
};

const deleteItem = () => {
  emit('delete');
};

const handleCancel = () => {
  local.value = originalValue.value;
  isEditing.value = false;
};
</script>

<template>
  <div class="flex gap-2 items-center group">
    <input
      v-model="local"
      :readonly="!isEditing"
      @keydown.enter="handleSave"
      @keydown.escape="handleCancel"
      class="bg-gray-800 text-white px-3 py-2 rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{
        'border-gray-600 read-only:bg-gray-700': !isEditing,
        'border-blue-500 bg-gray-750': isEditing,
        'cursor-not-allowed opacity-75': !isEditing,
        'cursor-text': isEditing
      }"
      placeholder='Enter title...'
    />

    <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        v-if="!isEditing"
        @click="startEditing"
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
      > 
        Edit
      </button>
      <button
        v-if="!isEditing"
        @click="deleteItem"
        class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center gap-1"
      > 
        Delete
      </button>

      <button
        v-else
        @click="handleSave"
        :disabled="!local.trim()"
        class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
      >
        Save
      </button>

      <button
        v-if="isEditing"
        @click="handleCancel"
        class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-200 flex items-center gap-1"
      >
        Cancel
      </button>
    </div>
  </div>
</template>