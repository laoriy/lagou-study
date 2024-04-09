import React from "react"
import { Router } from "@reach/router"
import Layout from "../../components/Layout"
import Settings from "../../components/Settings"
import Create from "../../components/Create"
import PrivateRoute from "../../components/PrivateRoute"

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/create" component={Create} />
      </Router>
    </Layout>
  )
}

export default App
