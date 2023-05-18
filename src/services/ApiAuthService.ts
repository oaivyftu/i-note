import http from "./http"
import { NoteInput, NoteItem, User, UserInput } from "../types"
import { AxiosResponse } from "axios"

const featureUrl = "auth"

export default {
  async login(payload: UserInput) {
    const {
      data: { token, userId },
    } = await http.post(`${featureUrl}/login`, payload)
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
  },
  async register(payload: UserInput): Promise<AxiosResponse<User>> {
    return await http.post(`${featureUrl}/register`, payload)
  },
}
