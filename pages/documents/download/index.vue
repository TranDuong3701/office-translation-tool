<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '@/stores/document'

const store = useDocumentStore()
const { getDocument, downloadDocument } = store
const { document, totalSegments, translatedSegments } = storeToRefs(store)
await getDocument(document.value!._id)

const chartData = ref({
  labels: ['Total Segments', 'Translated Segments'],
  datasets: [
    {
      data: [totalSegments, translatedSegments],
      backgroundColor: ['#42A5F5', '#66BB6A'],
      hoverBackgroundColor: ['#64B5F6', '#81C784'],
    },
  ],
})
const lightOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
}
const handleDonwloadDocument = async () => {
  try {
    await downloadDocument(document.value!._id, document.value!.name)
  }
  catch (error) {}
}

const router = useRouter()
const navigateToTranslation = () => router.push('/documents/translation')
</script>

<template>
  <div v-if="document" class="document-stats">
    <Toast />
    <div class="document-progress">
      <Chart type="pie" :data="chartData" :options="lightOptions" />
    </div>
    <Card class="document-info shadow-2">
      <template #header>
        <img class="preview" src="@/assets/images/excel-logo.png">
      </template>
      <template #title>
        <strong>
          {{ document.name }}
        </strong>
      </template>
      <template #subtitle>
        <div class="info">
          <p>Size: {{ document.size }} KB</p>
          <p>Owner: {{ document.owner || "Trần Khắc Bình Dương" }}</p>
          <p>Translator: {{ document.translator || "Trần Khắc Bình Dương" }}</p>
          <p>Uploaded at: {{ document.createdAt.split("T")[0] }}</p>
          <div class="actions">
            <Button
              icon="pi pi-arrow-left"
              label="Get back translation"
              class="p-button-secondary"
              @click="navigateToTranslation"
            />
            <Button
              icon="pi pi-download"
              label="Download"
              style="margin-left: 0.5em"
              @click="handleDonwloadDocument"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.p-card) {
  .p-card-title {
    color: #111
  }
  .p-card-subtitle {
    color: #111
  }
  .p-card-content {
    display: none;
  }
}
.document-stats {
  display: flex;
  margin-top: 32px;
  justify-content: space-between;
  padding-bottom: 36px;

  > .document-progress {
    width: 45%;
  }

  > .document-info {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  > .document-info > .preview {
    height: 45%;
  }
  > .document-info > .info {
    padding: 16px;
  }
}
</style>
