import { useState } from "react"

export const useFormState = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return { username, password, setUsername, setPassword }
}
