<script setup lang="ts">
const steps = ref([
  {
    label: 'Upload document',
    to: '/documents',
  },
  {
    label: 'Translate document',
    to: '/documents/translation',
  },
  {
    label: 'Download document',
    to: '/documents/download',
  },
])
</script>

<template>
  <div class="translation-flow shadow-2">
    <Steps
      :model="steps"
      :readonly="true"
      aria-label="Document Translation Steps"
    />
  </div>
</template>

<style scoped>
.translation-flow {
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
}
</style>
