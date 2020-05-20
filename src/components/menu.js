// src/components/Menu.js

import React from "react"
import get from "lodash/get"
import { StaticQuery, graphql } from "gatsby"
import MenuItem from "./menuitem"
import styled from "styled-components"
const keyMaker = () => {
  let id = 0
  return () => {
    id++
  }
}
const getKey = keyMaker()
const MenuWrapper = styled.div`
  display: flex;
  // width: 100%;
  align-items: center;
  & > * {
    margin-left: 1em;
  }
  // justify-content: space-between;
`
/**
 * Define MenuItem fragment and get all primary menu items.
 */
const MENU_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        postPrefix
        siteUrl
      }
    }
    wpgraphql {
      menus(where: { location: PRIMARY }) {
        edges {
          node {
            id
            menuId
            name
            slug
            menuItems {
              edges {
                node {
                  id
                  title
                  target
                  menuItemId
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

const Menu = () => {
  console.log("Menu...")
  return (
    <StaticQuery
      query={MENU_QUERY}
      render={data => {
        const menu = get(data, "wpgraphql.menus.edges[0].node")
        if (menu) {
          const menuItems = get(menu, "menuItems.edges", []).map(
            ({ node }) => node
          )
          const wordPressUrl = data.site.siteMetadata.siteUrl
          // const wordPressUrl = "http://localhost:8080"

          /* eslint-disable */
          console.log(
            `%c ${"StaticQuery"}: %c ${""}`,
            `color: Gainsboro;background: LightSlateGray;font-size: 20px;font-family: -apple-system, BlinkMacSystemFont;text-transform:uppercase;font-weight: bold;'padding: 5px 0 5px 5px;line-height: 2`,
            `color: MintCream;background: LightSlateGray;font-size: 20px;padding: 5px 5px 5px 0;font-family: -apple-system, BlinkMacSystemFont;line-height: 2`,
            { data, menuItems, menu, wordPressUrl }
          )
          /* eslint-enable */

          return (
            <MenuWrapper>
              {menuItems &&
                menuItems.map(menuItem => (
                  <MenuItem
                    key={getKey()}
                    menuItem={menuItem}
                    wordPressUrl={wordPressUrl}
                  />
                ))}
            </MenuWrapper>
          )
        }
        return null
      }}
    />
  )
}

export default Menu
