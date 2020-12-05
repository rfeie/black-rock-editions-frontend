const path = require(`path`)
const get = require("lodash/get")
const mapWorks = obj => {
  const artists = get(obj, "allWordpressWpArtist.edges", [])
  const works = get(obj, "allWordpressWpWork.edges", [])
  return works.reduce((acc, work) => {
    const workId = work.node.wordpress_id
    const artist = artists.find(artist => {
      return get(artist, "node.acf.associated_works", []).find(
        ac => get(ac, "wordpress_id", null) === workId
      )
    })

    if (!artist) {
      return acc
    }

    return [...acc, { work: work.node, artist: artist.node }]
  }, [])
}

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

              wordpress_id
              acf {
                associated_works {
                  wordpress_id
                }
              }
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
            }
          }
        }
      }
    `
  ).then(result => {
    // console.log(
    //   "\n\n\n\n Start artist works, \n\n\n\n\n",
    //   JSON.stringify(result.data, null, 2)
    // )
    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allWordpressWpArtist

    edges.forEach(async edge => {
      if (edge.node.fields.deploy) {
        console.log("\n\n\n\nEDGE artist, ", {
          path: `${edge.node.path}`,
          component: artistTemplate,
          context: {
            id: edge.node.wordpress_id,
            works: get(edge, "node.acf.associated_works", []).map(
              ({ wordpress_id }) => wordpress_id
            ),
          },
        })

        createPage({
          path: `${edge.node.path}`,
          component: artistTemplate,
          context: {
            id: edge.node.wordpress_id,
            works: get(edge, "node.acf.associated_works", []).map(
              ({ wordpress_id }) => wordpress_id
            ),
          },
        })
      }
    })
    // ==== END Artists ====
    // ==== START Works  ====
    mapWorks(result.data).forEach(({ work, artist }) => {
      // console.log(
      //   "\n\n\n\nEDGE work, " + edge.node.fields.deploy &&
      //     edge.node.acf.artist[0].wordpress_id,
      //   JSON.stringify(edge, null, 2)
      // )
      if (work.fields.deploy) {
        createPage({
          path: `${work.path}`,
          component: workTemplate,
          context: {
            id: work.wordpress_id,
            artistId: artist.wordpress_id,
          },
        })
      }
    })
    return null
  })
}
