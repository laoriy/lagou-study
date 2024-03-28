import * as React from "react";
import { Link, PageProps, graphql } from "gatsby";
import Header from "../components/Header";

const HomePage = ({ data }: PageProps<Queries.HomePageQuery>) => {
  console.log(data);

  return (
    <main>
      <Header></Header>
      <h1 className="">About Me</h1>
      <Link to="/about">About</Link>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
      {data.site?.siteMetadata?.siteUrl}
      {data.site?.siteMetadata?.title}
    </main>
  );
};

export const Head = () => <title>About Me</title>;

export const query = graphql`
  query HomePage {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`;

export default HomePage;
