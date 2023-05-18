export interface NoteItem {
  id: number
  content: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface NoteInput extends Pick<NoteItem, "content" | "text"> {}
