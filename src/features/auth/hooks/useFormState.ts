import { useState } from "react"

export const useFormState = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  return { username, password, isSubmitting, setUsername, setPassword, setIsSubmitting }
}
