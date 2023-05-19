import styled, { css } from "styled-components"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import { FormRow, HeaderRow, SubmitRow, Wrapper } from "./commonStyles"
import { FormEvent } from "react"
import ApiAuthService from "../../../services/ApiAuthService"
import { useFormState } from "../hooks/useFormState"
import { AxiosError } from "axios"

function Login() {
  const { username, password, isSubmitting, setUsername, setPassword, setIsSubmitting } =
    useFormState()
  const { push } = useHistory()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      await ApiAuthService.login({ username, password })
      push("/")
    } catch (e) {
      const error = e as AxiosError
      alert(error.response?.data)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <HeaderRow>
          <h1>Login</h1>
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
          <button type="submit">{isSubmitting ? "Submitting..." : "Submit"}</button>
        </SubmitRow>
      </form>
      <p>
        Don't have an account. You can register <Link to={"/auth/register"}>here</Link>.
      </p>
    </Wrapper>
  )
}

export default Login
