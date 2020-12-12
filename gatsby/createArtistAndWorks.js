const path = require(`path`)
const get = require("lodash/get")

const mapWorks = obj => {
  const artists = get(obj, "allWpArtist.edges", [])
  const works = get(obj, "allWpWork.edges", [])
  return works.reduce((acc, work) => {
    const workId = work.node.databaseId
    const artist = artists.find(artist => {
      return get(artist, "node.artist_works.associated_works", []).find(
        ac => get(ac, "databaseId", null) === workId
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
        allWpArtist {
          edges {
            node {
              id
              slug
              title
              status
              databaseId
              uri
              artist_works {
                associatedWorks {
                  ... on WpWork {
                    id
                    databaseId
                  }
                }
              }
            }
          }
        }
        allWpWork {
          edges {
            node {
              databaseId
              id
              slug
              status
              uri
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

    const { edges } = result.data.allWpArtist

    edges.forEach(async edge => {
      if (edge.node.status === "publish") {
        const context = JSON.parse(
          JSON.stringify({
            id: edge.node.databaseId,
            works: (get(edge, "node.artist_works.associatedWorks") || []).map(
              ({ id }) => id
            ),
          })
        )

        console.log(
          "ARTIST AND WORKS \n\n\n\n\n",
          {
            path: `${edge.node.uri}`,
            component: artistTemplate,
            context,
          },
          "\n\n\n\n"
        )
        createPage({
          path: `${edge.node.uri}`,
          component: artistTemplate,
          context,
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
      if (edge.node.status === "publish") {
        createPage({
          path: `${work.uri}`,
          component: workTemplate,
          context: {
            id: work.databaseId,
            artistId: artist.databaseId,
          },
        })
      }
    })
    return null
  })
}
