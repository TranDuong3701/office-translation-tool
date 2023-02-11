<script setup>
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '@/stores/document'

const formData = new FormData()
const file = ref(null)
const totalSize = ref(0)
const totalSizePercent = ref(0)

const store = useDocumentStore()
const { importDocument } = store
const { document } = storeToRefs(store)
const router = useRouter()

const formatSize = (bytes) => {
  if (bytes === 0)
    return '0 B'

  const k = 1000
  const dm = 3
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

const onSelectedFiles = (event) => {
  file.value = event.files[0]
  totalSize.value = parseInt(formatSize(event.files[0].size))
  totalSizePercent.value = totalSize.value / 10
}

const uploadEvent = async () => {
  formData.append('document', file.value)

  try {
    await importDocument(formData)

    if (document.value)
      router.push('/documents/translation')
  }
  catch (error) {}
}
</script>

<template>
  <Toast />
  <div class="shadow-1 form-upload">
    <FileUpload
      accept=".xlsx"
      :file-limit="1"
      :max-file-size="1000000"
      @select="onSelectedFiles"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
          <div class="flex gap-2">
            <Button icon="pi pi-images" class="p-button-rounded" :disabled="files.length" @click="chooseCallback()" />
            <Button icon="pi pi-cloud-upload" class="p-button-rounded p-button-success" :disabled="!files || files.length === 0" @click="uploadEvent" />
            <Button icon="pi pi-times" class="p-button-rounded p-button-danger" :disabled="!files || files.length === 0" @click="clearCallback()" />
          </div>
          <ProgressBar :value="totalSizePercent" :show-value="true" class="md:w-20rem h-1rem w-full md:ml-auto" :class="[{ 'exceeded-progress-bar': (totalSizePercent > 100) }]">
            <span class="white-space-nowrap">{{ totalSize }}KB / 1MB</span>
          </ProgressBar>
        </div>
      </template>
      <template #content="{ files }">
        <div>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div v-for="file of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
              <div>
                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2">
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex align-items-center justify-content-center flex-column">
          <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
          <p class="mt-4 mb-0">
            Drag and drop files to here to upload. (Accept .xlsx file)
          </p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.custom-progress-bar) {
  .p-progressbar-value {
      background-color: #f44336;
    }
}
</style>
