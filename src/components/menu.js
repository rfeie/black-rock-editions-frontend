// src/components/Menu.js

import React from "react"
import get from "lodash/get"
import { StaticQuery, graphql } from "gatsby"
import MenuItem from "./menuitem"
import styled from "styled-components"
import { getKey } from "../utils"
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
      menus(where: { location: EXPANDED }) {
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
