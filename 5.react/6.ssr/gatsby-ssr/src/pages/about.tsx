// Step 1: Import React
import * as React from "react";
import { Link, PageProps, graphql } from "gatsby";
// Step 2: Define your component
function AboutPage({ data }: PageProps<Queries.AboutPageQuery>) {
  return (
    <main>
      <h1>About Me</h1>
      <Link to="/">Back to Home</Link>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
      {data.allMarkdownRemark.nodes.map((post) => (
        <div key={post.id}>
          <p>{post?.frontmatter?.title}</p>
          <p>{post?.frontmatter?.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html! }}></div>
        </div>
      ))}
    </main>
  );
}

// Step 3: Export your component

export const query = graphql`
  query AboutPage {
    allMarkdownRemark {
      nodes {
        id
        html
        frontmatter {
          title
          date
        }
      }
    }
  }
`;
export default AboutPage;
