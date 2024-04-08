import React from "react"
import { useCountStore } from "../store"

export default function Banner() {
  const state = useCountStore()

  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">conduit {state.count}</h1>
        <p>A place to share your knowledge.</p>
        <button className="red" onClick={state.increment}>
          +1
        </button>
        <button onClick={state.decrement}>-1</button>
      </div>
    </div>
  )
}
