import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../types/auth";

const AdminRoute: FC<any> = ({ component: Component, ...rest }) => {
  const auth = isAuth();
  if (auth) {
    const {
      user: { role },
    } = auth as Jwt;
    if (role === 1) return <Component {...rest} />;
  }

  return <Navigate replace to="/signin" />;
};

export default AdminRoute;
