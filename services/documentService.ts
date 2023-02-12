import { http } from '@/services'
import type { Document } from '@/types'

export const documentService = {
  async importDocument(formData: FormData): Promise<Document> {
    const info: Document = await http.post('/api/v1/documents', formData)

    return info
  },

  async getDocument(id: string): Promise<Document> {
    const info: Document = await http.get(`/api/v1/documents/${id}`)

    return info
  },

}
