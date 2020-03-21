// src/components/Menu.js

import React from "react"
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
  width: 100%;
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
      }
    }
    wpgraphql {
      headerMenu {
        url
        label
        type
      }
    }
  }
`

const Menu = () => {
  return (
    <StaticQuery
      query={MENU_QUERY}
      render={data => {
        if (data.wpgraphql.headerMenu) {
          const menuItems = data.wpgraphql.headerMenu
          //   const wordPressUrl = data.wpgraphql.generalSettings.url
          const wordPressUrl = "http://localhost:8080"

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
