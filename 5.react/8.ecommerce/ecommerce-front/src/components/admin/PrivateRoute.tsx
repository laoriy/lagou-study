import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "../../helpers/auth";

const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  const auth = isAuth();
  if (auth) {
    return <Component {...rest} />;
  }

  return <Navigate replace to="/signin" />;
};

export default PrivateRoute;
