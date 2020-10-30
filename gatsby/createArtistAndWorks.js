const path = require(`path`)

/**
 * Create WordPress Posts
 */
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions
  const artistTemplate = path.resolve(`./src/templates/artist.js`)
  const workTemplate = path.resolve(`./src/templates/work.js`)

  return graphql(
    `
      {
        allWordpressWpArtist {
          edges {
            node {
              id
              slug
              path
              title
              type
              fields {
                deploy
              }
              acf {
                name
              }
              wordpress_id
            }
          }
        }
        allWordpressWpWork {
          edges {
            node {
              wordpress_id
              slug
              path
              fields {
                deploy
              }
              acf {
                artist {
                  wordpress_id
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    // console.log(
    //   "\n\n\n\n Start artist works, \n\n\n\n\n",
    //   JSON.stringify(result.data.allWordpressWpWork.edges, null, 2)
    // )
    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allWordpressWpArtist

    edges.forEach(edge => {
      if (edge.node.fields.deploy) {
        // console.log("\n\n\n\nEDGE artist, ", JSON.stringify(edge, null, 2))

        createPage({
          path: `${edge.node.path}`,
          component: artistTemplate,
          context: {
            id: edge.node.wordpress_id,
          },
        })
      }
    })
    // ==== END Artists ====

    // ==== START Works  ====
    result.data.allWordpressWpWork.edges.forEach(edge => {
      // console.log(
      //   "\n\n\n\nEDGE work, " + edge.node.fields.deploy &&
      //     edge.node.acf.artist[0].wordpress_id,
      //   JSON.stringify(edge, null, 2)
      // )
      if (edge.node.fields.deploy && edge.node.acf.artist[0].wordpress_id) {
        createPage({
          path: `${edge.node.path}`,
          component: workTemplate,
          context: {
            id: edge.node.wordpress_id,
            artistId: edge.node.acf.artist[0].wordpress_id,
          },
        })
      }
    })
    return null
  })
}
