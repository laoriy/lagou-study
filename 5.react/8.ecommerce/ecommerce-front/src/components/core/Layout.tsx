import React, { FC } from "react";
import Nav from "./Nav";
import PageHeader from "./PageHeader";
type Props = {
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
};

const Layout: FC<Props> = ({ children, title, subTitle = "" }) => {
  return (
    <div>
      <Nav></Nav>
      <PageHeader title={title} subTitle={subTitle}></PageHeader>
      <div style={{ width: "85%", margin: "0 auto" }}>{children}</div>
    </div>
  );
};

export default Layout;
