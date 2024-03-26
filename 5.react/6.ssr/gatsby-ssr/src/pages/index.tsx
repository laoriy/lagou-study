import * as React from "react";
import { Link } from "gatsby";

const AboutPage = () => {
  return (
    <main>
      <h1 className="">About Me</h1>
      <Link to="/about">About</Link>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
    </main>
  );
};

export const Head = () => <title>About Me</title>;

export default AboutPage;
