import { Redirect, Route } from "react-router-dom"
import { RouteProps } from "react-router"

const ProtectedRoute = (props: RouteProps) => {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Redirect to={`/auth/login`} />
  }
  return <Route {...props} />
}

export default ProtectedRoute
