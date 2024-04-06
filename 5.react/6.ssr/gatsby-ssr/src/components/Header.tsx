import { PageProps } from "gatsby";
import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"

export default function Header() {
  // const dispatch = useDispatch()

  const dispatch = (_d: any) => {
    authReducer.success = true;
  };

  const authReducer = {
    success: false,
    user: {
      username: "",
    },
  };
  // const authReducer = useSelector(state => state.authReducer)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: "loadUser",
        payload: token,
      });
    }
  }, []);
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
          {authReducer.success ? (
            <Login username={authReducer.user.username} />
          ) : (
            <Logout />
          )}
        </ul>
      </div>
    </nav>
  );
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
  );
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
  );
}
