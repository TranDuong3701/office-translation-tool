export interface Document {
  _id: string
  name: string
  path: string
  owner: null
  translator: null
  project: null
  createdAt: string
  updatedAt: string
  segments: any[]
  progress: number | null
}
