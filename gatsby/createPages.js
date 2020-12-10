const path = require(`path`)
const { associatedLayouts } = require(`./constants`)

const get = require("lodash/get")

/**
 * Create WordPress Posts
 */
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`./src/templates/page.js`)

  return graphql(
    `
      {
        site {
          siteMetadata {
            pagePrefix
          }
        }
        allWpPage {
          edges {
            node {
              id
              slug
              status
              link
              custom_page_layouts {
                associatedLayout
                enable
              }
            }
          }
        }
        site {
          id
          siteMetadata {
            title
            description
          }
        }

        allWp {
          nodes {
            allSettings {
              generalSettingsUrl
            }
          }
        }
      }
    `
  ).then(async result => {
    if (result.errors) {
      throw result.errors
    }

    const { pagePrefix } = result.data.site.siteMetadata
    const { edges } = result.data.allWpPage
    const { generalSettingsUrl } = result.data.allWp.nodes[0].allSettings
    // use url?
    edges.forEach(edge => {
      // console.log("edge\n\nn\n\n\n\n\n\nn", edge)
      let component = postTemplate
      if (edge.node.status === "publish") {
        const { enable, associatedLayout = {} } =
          get(edge, "node.custom_page_layouts") || {}
        const link = edge.node.link.replace(generalSettingsUrl, "")

        if (!!enable) {
          component = associatedLayouts[associatedLayout]
            ? associatedLayouts[associatedLayout]
            : component
        }
        createPage({
          path: `${pagePrefix}${link}`,
          component,
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
