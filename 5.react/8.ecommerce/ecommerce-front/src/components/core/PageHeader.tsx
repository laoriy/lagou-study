import React, { FC } from "react";

const PageHeader: FC<{ title: string; subTitle: string }> = ({
  title,
  subTitle,
}) => {
  return (
    <header className="jumbotron">
      <h4 className="title">{title}</h4>
      <div className="sub-title">{subTitle}</div>
    </header>
  );
};

export default PageHeader;
