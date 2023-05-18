export interface NoteItem {
  id: number
  content: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface NoteInput extends Pick<NoteItem, "content" | "text"> {
  userId?: number
}

export interface User {
  id: number
  username: string
  password: string
}

export interface UserInput extends Pick<User, "username" | "password"> {}
