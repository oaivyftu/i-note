import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Note from "./features/note"
import ErrorBoundary from "./components/ErrorBoundary"
import Auth from "./features/auth"

const RouteMapper = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Note />
        </Route>
        <Auth />
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
