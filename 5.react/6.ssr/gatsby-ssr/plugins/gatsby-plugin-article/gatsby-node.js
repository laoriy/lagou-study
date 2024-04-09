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
      component: require.resolve("../../src/templates/article.js"),
      context: {
        slug: article.slug,
      },
    })
  })
}
