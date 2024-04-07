import React, { FormEventHandler } from "react";
// import useInput from "../hooks/useInput"
// import { useDispatch, useSelector } from "react-redux"
import { navigate } from "gatsby";

export default function Login() {
  // const email = useInput("")
  // const password = useInput("")
  // const dispatch = useDispatch()
  // const authReducer = useSelector(state => state.authReducer)

  const authReducer = {
    success: false,
    errors: [],
  };

  const password = {
    input: {
      value: "",
    },
  };
  const email = {
    input: {
      value: "",
    },
  };

  const dispatch = (_d: any) => {
    authReducer.success = true;
  };

  if (authReducer.success) {
    navigate("/");
    return null;
  }
  function displayErrors() {
    if (authReducer.errors) {
      return authReducer.errors.map((item, index) => (
        <li key={index}>{item}</li>
      ));
    }
    return null;
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    const passwordValue = password.input.value;
    const emailValue = email.input.value;
    dispatch({
      type: "login",
      payload: { user: { email: emailValue, password: passwordValue } },
    });
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
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
