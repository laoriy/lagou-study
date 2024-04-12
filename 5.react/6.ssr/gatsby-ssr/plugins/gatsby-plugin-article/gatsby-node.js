const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  let { data } = await graphql(`
    query {
      allArticlesList {
        nodes {
          slug
        }
      }
    }
  `)
  data.allArticlesList.nodes.forEach(article => {
    createPage({
      path: `/article/${article.slug}`,
      component: path.resolve(__dirname, "../../src/templates/article.tsx"),
      context: {
        slug: article.slug,
      },
    })
  })
}
