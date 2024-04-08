import React from "react"
import useInput from "../hooks/useInput"
import { navigate } from "gatsby"
import { useAuthStore } from "../store"

export default function Login() {
  const auth = useAuthStore()
  const email = useInput("")
  const password = useInput("")

  if (auth.success) {
    navigate("/")
    return null
  }
  function displayErrors() {
    if (auth.errors) {
      return auth.errors.map((item: any, index: any) => (
        <li key={index}>{item}</li>
      ))
    }
    return null
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    const passwordValue = password.input.value
    const emailValue = email.input.value
    auth.login({ user: { email: emailValue, password: passwordValue } })
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <ul className="error-messages">{displayErrors()}</ul>
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  {...email.input}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  {...password.input}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
