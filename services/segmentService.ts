import { http } from '@/services'
import type { Segment } from '@/types'

export const segmentService = {
  async translateSegment(id: string, data: Record<string, any>) {
    const info: Segment = await http.patch(`/api/v1/segments/${id}`, data)
    return info
  },
}
