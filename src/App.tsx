import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Note from "./features/note"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Note />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
