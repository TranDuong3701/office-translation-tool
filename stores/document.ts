import { defineStore } from 'pinia'
import { documentService, segmentService } from '@/services'
import type { Document } from '@/types'

export const useDocumentStore = defineStore('document', () => {
  const state = reactive<{
    document: Document | null
  }>({
    document: null,
  })

  const totalSegments = computed(() => {
    return state.document!.segments!.length
  })

  const translatedSegments = computed(() => {
    return state.document!.segments!.filter((segment: { target: any }) => segment.target).length
  })

  const importDocument = async (formData: FormData) => {
    try {
      const document = await documentService.importDocument(formData)
      state.document = document
    }
    catch (error) {}
  }

  const getDocument = async (id: string) => {
    try {
      const document = await documentService.getDocument(id)
      state.document = document
    }
    catch (error) {

    }
  }

  const translateSegment = async (id: string, data: Record<string, any>) => {
    try {
      const segment = await segmentService.translateSegment(id, data)

      const index = state.document!.segments.findIndex(segment => segment._id === id)
      state.document!.segments.splice(index, 1, segment)
    }
    catch (error) {

    }
  }

  const downloadDocument = async (id: string, title: string) => {
    try {
      await documentService.downloadDocument(id, title)
    }
    catch (error) {
    }
  }

  return {
    ...toRefs(state),
    importDocument,
    getDocument,
    translateSegment,
    downloadDocument,
    translatedSegments,
    totalSegments,
  }
}, {
  persist: true,
})
