import styled, { css } from "styled-components"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import { useFormState } from "../hooks/useFormState"
import { FormEvent } from "react"
import ApiAuthService from "../../../services/ApiAuthService"
import { FormRow, HeaderRow, SubmitRow, Wrapper } from "./commonStyles"

function Register() {
  const { username, password, setUsername, setPassword } = useFormState()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  console.log(url)
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await ApiAuthService.register({ username, password })
      alert("Register successfully!")
      push("/auth/login")
    } catch (e) {
      const error = e as Error
      alert(error.message)
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
          <button type="submit">Submit</button>
        </SubmitRow>
      </form>
    </Wrapper>
  )
}

export default Register
