import React from "react";
import { PageProps, graphql } from "gatsby";

function Post({ data }: PageProps<Queries.PostQuery>) {
  return (
    <div>
      <p>{data.markdownRemark?.frontmatter?.title}</p>
      <p>{data.markdownRemark?.frontmatter?.date}</p>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark?.html! }}></div>
    </div>
  );
}

export const query = graphql`
  query Post($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
      }
      id
    }
  }
`;

export default Post;
