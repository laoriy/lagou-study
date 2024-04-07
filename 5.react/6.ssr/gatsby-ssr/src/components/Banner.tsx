import React from "react"
import { useBearStore } from "../store"

export default function Banner() {
  const state = useBearStore()

  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">conduit {state.count}</h1>
        <p>A place to share your knowledge.</p>
        <button onClick={state.increment}>+1</button>
        <button onClick={state.decrement}>-1</button>
      </div>
    </div>
  )
}
