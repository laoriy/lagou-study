const axios = require("axios")
const createNodeHelpers = require("gatsby-node-helpers").default
const { paginate } = require("gatsby-awesome-pagination")

exports.sourceNodes = async ({ actions }, { apiUrl }) => {
  const { createNode } = actions
  let articles = await loadArticles(apiUrl)
  const { createNodeFactory, generateNodeId } = createNodeHelpers({
    typePrefix: "articles",
  })
  const createNodeObject = createNodeFactory("list", node => {
    node.id = generateNodeId("list", node.slug)
    return node
  })
  articles.forEach(article => {
    createNode(createNodeObject(article))
  })
}

async function loadArticles(apiUrl) {
  let limit = 100
  let offset = 0
  let result = []
  await load()
  async function load() {
    let { data } = await axios.get(`${apiUrl}/articles`, {
      params: { limit, offset },
    })
    result.push(...data.articles)
    if (result.length < data.articlesCount) {
      offset += limit
      await load()
    }
  }
  return result
}

// exports.createPages = async ({ actions, graphql }) => {
//   const { createPage } = actions

//   let { data } = await graphql(`
//     query {
//       allArticlesList {
//         nodes {
//           slug
//         }
//       }
//     }
//   `)

//   // Create your paginated pages
//   paginate({
//     createPage, // The Gatsby `createPage` function
//     items: data.allArticlesList.nodes, // An array of objects
//     itemsPerPage: 10, // How many items you want per page
//     pathPrefix: "/list", // Creates pages like `/blog`, `/blog/2`, etc
//     component: require.resolve("../../src/templates/list.js"), // Just like `createPage()`
//   })
// }
