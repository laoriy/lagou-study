import { graphql, useStaticQuery } from "gatsby";
import React from "react";
function Header() {
  const data = useStaticQuery<Queries.HeaderQuery>(graphql`
    query Header {
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
    }
  `);
  return (
    <>
      <h1 className="">My Site Header</h1>
      <h2>{data.site?.siteMetadata?.title}</h2>
      <h3>{data.site?.siteMetadata?.siteUrl}</h3>
    </>
  );
}

export default Header;
