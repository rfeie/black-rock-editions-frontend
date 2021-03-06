const path = require(`path`)

/**
 * Create WordPress Posts
 */
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`./src/templates/post.js`)

  return graphql(
    `
      {
        site {
          siteMetadata {
            postPrefix
          }
        }
        allWpPost {
          edges {
            node {
              id
              slug
              modified
              categories {
                nodes {
                  name
                }
              }
              status
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const { postPrefix } = result.data.site.siteMetadata
    const { edges } = result.data.allWpPost

    edges.forEach(edge => {
      if (edge.node.status === "publish") {
        // console.log("\n\n\n\nEDGE post, ", JSON.stringify(edge, null, 2))

        createPage({
          path: `${postPrefix}/${edge.node.slug}`,
          component: postTemplate,
          context: {
            id: edge.node.id,
          },
        })
      }
    })
    // ==== END POSTS ====
    return null
  })
}
