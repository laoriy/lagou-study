import React, { FC } from "react";
import Nav from "./Nav";
import PageHeader from "./PageHeader";
type Props = {
  children?: React.ReactNode;
  title: string;
};

const Layout: FC<Props> = ({ children, title }) => {
  return (
    <div>
      <Nav></Nav>
      <PageHeader title={title} subTitle="欢迎来到拉勾电商, 尽情享受吧"></PageHeader>
      {children}
    </div>
  );
};

export default Layout;
