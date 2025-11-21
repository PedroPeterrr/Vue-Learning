<script setup lang="ts">
import type { Series, Lesson } from '@/type/type';

defineProps<{
  series: Series[]
  lessons: Lesson[]
}>();

const emit = defineEmits(['updateTitle', 'addSeries', 'addLesson', 'deleteContent', 'openModal']);

const handleSave = (payload: { id: number; title: string }) => {
  emit('updateTitle', payload.id, payload.title);
}

const handleDelete = (payload: { type: 'series' | 'lesson'; id: number }) =>{
  emit('deleteContent', payload);
} 
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-2">
    <StatsContentSection
      title="Series"
      :items="series"
      type="series"
      @save="handleSave"
      @delete="handleDelete"
      @openModal="(type) => emit('openModal', type)"
    />
    
    <StatsContentSection
      title="Lesson"
      :items="lessons"
      type="lesson"
      @save="handleSave"
      @delete="handleDelete"
      @openModal="(type) => emit('openModal', type)"
    />
  </div>
</template>
