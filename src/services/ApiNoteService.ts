import http from "./http"
import { NoteInput, NoteItem } from "../types"
import { AxiosResponse } from "axios"

const featureUrl = "notes"

export default {
  async getNoteList(): Promise<AxiosResponse<NoteItem[]>> {
    const userId = localStorage.getItem("userId")
    return await http.get(`${featureUrl}/?userId=${userId}`)
  },
  async createNewNote(payload: NoteInput): Promise<AxiosResponse<NoteItem>> {
    return await http.post(`${featureUrl}/`, payload)
  },
  async deleteNote(noteId: number): Promise<AxiosResponse<number>> {
    return await http.delete(`${featureUrl}/${noteId}`)
  },
  async updateNote(noteId: number, payload: NoteInput): Promise<AxiosResponse<NoteItem>> {
    return await http.put(`${featureUrl}/${noteId}`, payload)
  },
}
