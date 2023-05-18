import styled, { css } from "styled-components"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import { FormRow, HeaderRow, SubmitRow, Wrapper } from "./commonStyles"
import { FormEvent } from "react"
import ApiAuthService from "../../../services/ApiAuthService"
import { useFormState } from "../hooks/useFormState"
import { AxiosError } from "axios"

function Login() {
  const { username, password, setUsername, setPassword } = useFormState()
  const { push } = useHistory()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await ApiAuthService.login({ username, password })
      push("/")
    } catch (e) {
      const error = e as AxiosError
      alert(error.response?.data)
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
          <button type="submit">Submit</button>
        </SubmitRow>
      </form>
      <p>
        Don't have an account. You can register <Link to={"/auth/register"}>here</Link>.
      </p>
    </Wrapper>
  )
}

export default Login
