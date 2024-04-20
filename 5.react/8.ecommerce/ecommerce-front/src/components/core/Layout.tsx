import React, { FC } from "react";

type Props = {
  children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return <div>layout{children}</div>;
};

export default Layout;
