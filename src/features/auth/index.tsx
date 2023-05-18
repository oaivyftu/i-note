import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
function Auth() {
  const { path } = useRouteMatch()
  const token = localStorage.getItem("token")
  if (token) {
    return <Redirect to="/" />
  }
  return (
    <Wrapper>
      <Switch>
        <Route exact path={`${path}/login`}>
          <Login />
        </Route>
        <Route path={`${path}/register`}>
          <Register />
        </Route>
      </Switch>
    </Wrapper>
  )
}

export default Auth
