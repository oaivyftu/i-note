import { Route, Switch, useRouteMatch } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
function Auth() {
  const { path } = useRouteMatch()
  console.log(path)
  return (
    <Wrapper>
      <Switch>
        <Route path={`${path}/login`}>
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
