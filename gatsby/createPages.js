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
        allWordpressPage {
          edges {
            node {
              id
              slug
              fields {
                deploy
              }
              link
              acf {
                associated_layout
                enable
                additional_layout {
                  additional_values_value
                  key_value
                }
              }
            }
          }
        }
        wpgraphql {
          allSettings {
            generalSettingsUrl
          }
        }
      }
    `
  ).then(async result => {
    if (result.errors) {
      throw result.errors
    }

    const { pagePrefix } = result.data.site.siteMetadata
    const { edges } = result.data.allWordpressPage
    const { generalSettingsUrl } = result.data.wpgraphql.allSettings
    // use url?
    edges.forEach(edge => {
      // console.log("edge\n\nn\n\n\n\n\n\nn", edge)
      let component = postTemplate
      if (edge.node.fields.deploy) {
        const { enable, associated_layout = {} } = get(edge, "node.acf") || {}
        const link = edge.node.link.replace(generalSettingsUrl, "")
        console.log(
          "edge\n\nn\n\n\n\n\n\nn",
          edge,
          get(edge, "node.acf"),
          !!enable,
          associatedLayouts[associated_layout]
            ? associatedLayouts[associated_layout]
            : component
        )
        if (!!enable) {
          component = associatedLayouts[associated_layout]
            ? associatedLayouts[associated_layout]
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
