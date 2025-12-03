<script setup lang="ts">
import type { Series, Lesson } from '@/type/type';

const props = defineProps<{
  title: string;
  items: (Series | Lesson)[];
  type: 'series' | 'lesson';
}>();

const emit = defineEmits(['save', 'delete', 'openModal']);

const onSave = (id: number, title: string) => emit('save', { id, title });
const onDelete = (id: number) => emit('delete', { type: props.type, id });
const openModal = () => emit('openModal', props.type);
</script>

<template>
  <section class="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700 min-h-6 min-w-[430px]">
    <div class="flex items-center gap-3 mb-4">
      <div :class="['w-2 h-8 rounded', type === 'series' ? 'bg-blue-500' : 'bg-green-500']"></div>
      <div class="flex justify-between w-full">
        <h2 class="text-2xl font-bold text-white">
          <span class="text-gray-300">{{ title }}:</span>
          <span :class="type === 'series' ? 'text-blue-400' : 'text-green-400'" class="ml-2">{{ items.length }}</span>
        </h2>
        <button class="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded" @click="openModal">Add</button>
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="item in items" :key="item.id" class="group">
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50 hover:border-gray-500 transition-colors duration-200">
          <EditTableTitle
            :model-value="item.title"
            @save="(title: string) => onSave(item.id, title)"
            @delete="() => onDelete(item.id)"
          />
        </div>
      </div>
      <div v-if="items.length === 0" class="text-gray-400 text-center py-4 italic">
        No {{ type }} available
      </div>
    </div>
  </section>
</template>
