import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Note from "./features/note"
import ErrorBoundary from "./components/ErrorBoundary"
import Auth from "./features/auth"
import ProtectedRoute from "./components/ProtectedRoute"

const RouteMapper = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <Note />
        </ProtectedRoute>
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <RouteMapper />
    </ErrorBoundary>
  )
}

export default App
