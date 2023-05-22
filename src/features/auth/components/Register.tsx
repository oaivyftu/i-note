import { Link, useHistory } from "react-router-dom"
import { useFormState } from "../hooks/useFormState"
import { FormEvent } from "react"
import ApiAuthService from "../../../services/ApiAuthService"
import { FormRow, HeaderRow, SubmitRow, Wrapper } from "./commonStyles"
import { AxiosError } from "axios"

function Register() {
  const { username, password, isSubmitting, setUsername, setPassword, setIsSubmitting } =
    useFormState()
  const { push } = useHistory()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      await ApiAuthService.register({ username, password })
      alert("Register successfully!")
      push("/auth/login")
    } catch (e) {
      const error = e as AxiosError
      alert(error?.response?.data)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <HeaderRow>
          <h1>Register</h1>
        </HeaderRow>
        <FormRow>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormRow>
        <FormRow>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormRow>
        <SubmitRow>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </SubmitRow>
      </form>
      <p>
        Back to Login <Link to={"/auth/login"}>here</Link>.
      </p>
    </Wrapper>
  )
}

export default Register
