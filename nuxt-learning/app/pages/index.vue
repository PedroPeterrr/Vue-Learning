<script lang="ts" setup>
  import { useSeoMeta } from '#app'

  useSeoMeta({
    title: 'Laravel Stats Dashboard',
    description: 'View total series and lessons from Laravel backend.',
    ogTitle: 'Laravel Stats Dashboard',
    ogDescription: 'View total series and lessons from Laravel backend.',
  })

  const handleUpdateTitle = (id: number, title: string) => {
    updateTitle(id, title);
  };

  const handleAddSeries = async (title: string) => {
    if (!title.trim()) return;
    await createContent(title.trim(), 'series');
  };

  const handleAddLesson = async (title: string) => {
    if (!title.trim()) return;
    await createContent(title.trim(), 'lesson');
  };

  const handleDeleteContent = async ({ type, id }: { type: 'series' | 'lesson'; id: number }) => {
    await deleteContent(id,type);
  };

  const showModal = ref(false)
  const modalType = ref<'series' | 'lesson'>('series')
  const newTitle = ref('')

  const openModal = (type: 'series' | 'lesson') => {
    modalType.value = type
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const submitNew = () => {
    if (!newTitle.value.trim()) return
    if (modalType.value === 'series') {
      handleAddSeries(newTitle.value)
    } else {
      handleAddLesson(newTitle.value)
    }
    showModal.value = false
  }

  const { series, lessons, updateTitle, createContent, deleteContent } = useStats();
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-3 mb-4">
          <h1 class="text-4xl font-bold text-white">Laravel Stats Dashboard</h1>
        </div>
        <p class="text-gray-400 text-lg">Manage and edit your series and lessons</p>
      </div>

      <!-- Stats Card -->
      <StatsCard
        :series="series"
        :lessons="lessons"
        @updateTitle="handleUpdateTitle"
        @addSeries="handleAddSeries"
        @addLesson="handleAddLesson"
        @deleteContent="handleDeleteContent"
        @openModal="openModal"
      />

      <StatsModal
        v-if="showModal"
        :type="modalType"
        v-model="newTitle"
        @close="closeModal"
        @submit="submitNew"
      />

    </div>
  </div>
</template>
