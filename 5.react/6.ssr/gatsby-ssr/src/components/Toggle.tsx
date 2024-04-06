import React from "react"

export default function Toggle() {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className="nav-link disabled">Your Feed</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active">Global Feed</a>
        </li>
      </ul>
    </div>
  )
}
