export interface Document {
  _id: string
  name: string
  path: string
  owner: null
  translator: null
  project: null
  createdAt: string
  updatedAt: string
  segments?: any[]
  progress: number | null
  size: number
}

export interface Segment {
  _id: string
  source: string
  target: string | null
  document: string | Document
  isLock: boolean
  createdAt: string
  updatedAt: string
  metaData: SegmentMetaData
}

export interface SegmentMetaData {
  sheetId?: number
  cellAddress?: string
}
