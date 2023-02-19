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

  async downloadDocument(id: string, title: string) {
    const responseType = 'blob'
    const info = await http.get(`/api/v1/documents/${id}/export`, responseType)
    this.forceFileDownload(info, title)
  },

  forceFileDownload(data: any, title: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = title
    link.click()
    URL.revokeObjectURL(link.href)
  },
}
