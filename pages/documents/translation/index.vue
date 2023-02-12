<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '@/stores/document'
import type { Segment } from '@/types'

const store = useDocumentStore()
const { getDocument, translateSegment } = store
const { document } = storeToRefs(store)
await getDocument(document.value!._id)

const activeSegment = ref<Segment | null>(null)
const { isVisible, showDialog, hideDialog } = useDialog()

const target = ref(activeSegment.value?.target || '')
const showDialogTranslate = (segment: any) => {
  activeSegment.value = segment
  target.value = activeSegment.value?.target || ''
  showDialog()
}

const hideDialogTranslate = () => {
  activeSegment.value = null
  hideDialog()
}

const handleTranslateSegment = async () => {
  try {
    await translateSegment(activeSegment.value!._id, {
      target: target.value,
    })

    hideDialogTranslate()
    await getDocument(document.value!._id)
  }
  catch (error) {

  }
}

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
              @click="() => showDialogTranslate(data)"
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
    <Dialog
      v-model:visible="isVisible"
      class="translation-form"
      header="Translate segment"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
    >
      <div class="form-item">
        <label class="label" for="source-segment">Source</label>
        <Textarea
          id="source-segment"
          v-model="activeSegment!.source"
          style="width: 100%"
          disabled
        />
      </div>
      <br>
      <div class="form-item">
        <label class="label" for="target-segment">Target</label>
        <Textarea
          id="target-segment"
          v-model="target"
          :auto-resize="true"
          rows="3"
          style="width: 100%"
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-danger p-button-text"
          @click="hideDialogTranslate"
        />
        <Button label="Save" icon="pi pi-check" autofocus @click="handleTranslateSegment" />
      </template>
    </Dialog>
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
