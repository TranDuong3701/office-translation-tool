<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '@/stores/document'

const store = useDocumentStore()
const { getDocument } = store
const { document } = storeToRefs(store)
await getDocument(document.value!._id)

const segmentStatusIcon = (target: string) => {
  return target ? 'pi pi-check' : 'pi pi-unlock'
}
const isExceededProgressBar = computed(() => Number(document.value!.progress) > 100)
</script>

<template>
  <div class="translation-screen">
    <div class="document-info section">
      <h3 class="name">
        {{ document!.name }}
      </h3>
      <ProgressBar
        :value="document?.progress || 0"
        :show-value="false"
        class="md:w-20rem h-1rem w-full md:ml-auto"
        :class="[{ 'exceeded-progress-bar': isExceededProgressBar }]"
      />
    </div>
    <div class="document-details section shadow-1">
      <DataTable
        v-if="document"
        show-gridlines
        :value="document.segments"
        :scrollable="true"
        scroll-height="600px"
      >
        <Column field="source" header="Source" style="min-width: 200px">
          <template #body="{ data: { source } }">
            <span>{{ source }}</span>
          </template>
        </Column>
        <Column field="target" header="Target" style="min-width: 200px">
          <template #body="{ data: { target } }">
            <span>{{ target }}</span>
          </template>
        </Column>
        <Column
          field="isLock"
          header="Actions"
          style="max-width: 120px; display: flex; gap: 10px"
        >
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              class="p-button-raised p-button-rounded p-button-danger"
            />
            <Button
              :icon="segmentStatusIcon(data.target)"
              :class="{ 'p-button-success': data.target }"
              class="p-button-raised p-button-rounded"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.translation-screen {
  > .document-info {
    display: flex;
    align-items: center;
  }

}
.section {
  margin-top: 16px;
}
</style>
