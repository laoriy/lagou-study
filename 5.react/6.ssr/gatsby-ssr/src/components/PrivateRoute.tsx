import React, { ComponentClass } from "react"
import { navigate } from "gatsby"
import useLogin from "../hooks/useLogin"

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: () => React.JSX.Element,
}) => {
  const [isLogin, loading] = useLogin()
  if (loading) return null
  if (isLogin) return <Component {...rest}></Component>
  navigate("/login")
  return null
}

export default PrivateRoute
