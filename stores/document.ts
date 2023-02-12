import { defineStore } from 'pinia'
import { documentService } from '@/services'
import type { Document } from '@/types'

export const useDocumentStore = defineStore('document', () => {
  const state = reactive<{
    document: Document | null
  }>({
    document: null,
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

  return {
    ...toRefs(state),
    importDocument,
    getDocument,
  }
}, {
  persist: true,
})
