import React from "react"
import "./src/styles/global.css"
import Layout from "./src/components/Layout"

const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}

export { wrapPageElement }
