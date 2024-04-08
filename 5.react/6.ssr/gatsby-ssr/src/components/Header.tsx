import { PageProps } from "gatsby"
import React, { useEffect } from "react"
import { useAuthStore } from "../store"

export default function Header() {
  const auth = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      auth.loadUser(token)
    }
  }, [])
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active">Home</a>
          </li>
          {auth.success ? <Login username={auth.user.username} /> : <Logout />}
        </ul>
      </div>
    </nav>
  )
}

function Login({ username }: { username: string }) {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link">
          <i className="ion-compose" />
          &nbsp;New Post
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link">
          <i className="ion-gear-a" />
          &nbsp;Settings
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link">{username}</a>
      </li>
    </>
  )
}

function Logout() {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link">Sign in</a>
      </li>
      <li className="nav-item">
        <a className="nav-link">Sign up</a>
      </li>
    </>
  )
}
