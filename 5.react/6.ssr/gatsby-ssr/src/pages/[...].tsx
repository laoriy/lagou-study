import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Index from "../components/index"
import Login from "../components/login"
import NotFound from "../components/404"

const App = () => {
  return (
    <Layout>
      <Router basepath="">
        <Login path="/login" />
        <NotFound path="/404" />
        <Index path="/" />
      </Router>
    </Layout>
  )
}

export default App
