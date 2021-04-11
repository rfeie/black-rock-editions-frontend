// src/components/Menu.js

import React, { useState } from "react"
import get from "lodash/get"
import { StaticQuery, graphql } from "gatsby"
import MenuItem from "./menuitem"
import styled from "styled-components"
import { getKey } from "../utils"

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  // position: relative;
  width: max-content;
  .hamburger {
    overflow: hidden;
    cursor: pointer;
    transition: transform 400ms;
    user-select: none;
    width: 32px;
    height: -webkit-fill-available;
    }

  .hamRotate.active {
    transform: rotate(45deg);
  }

  .line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: #fff;
    stroke-width: 5.5;
    stroke-linecap: round;
  }

  .top {
    stroke-dasharray: 40 160;
  }

  .middle {
    stroke-dasharray: 40 142;
    transform-origin: 50%;
    transition: transform 400ms;
  }

  .bottom {
    stroke-dasharray: 40 85;
    transform-origin: 50%;
    transition: transform 400ms, stroke-dashoffset 400ms;
  }

  .active .top {
    stroke-dashoffset: -64px;
  }

  .active .middle {
    // stroke-dashoffset: -20px;
    transform: rotate(90deg);
  }

  .active .bottom {
    stroke-dashoffset: -64px;
  }
  .menu-items {
    position: absolute;
    width: 100%;
    &.opened {
      position: absolute;
      padding: 1em 10px;
      top: 100%;
      left: 0px;
      text-align: right;
      background: black;
      filter: opacity(75%);
    }
    &.closed {
      display: none;
    }
  }
  @media (min-width: 1024px) {
    .hamburger {
      display: none;
    }

    width: max-content;
    .menu-items {
      &.opened ,&.closed {
        position: relative;
        width: 100%;
        display: flex;
        & > div {
          margin-left: 1em;
        }
          display: flex;
        top: auto;
        left: auto;
        
    }
  }
`

const HamburgerWrapper = styled.div`
  height: 110%;
  width: max-content;
`
const Hamburger = ({ onClick, opened }) => {
  return (
    <HamburgerWrapper>
      <svg
        className={`hamburger hamRotate ${opened ? "active" : ""}`}
        viewBox="0 0 100 100"
        height="32"
        width="32"
        onClick={e => onClick(!opened)}
      >
        <path
          className="line top"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        />
        <path className="line middle" d="m 30,50 h 40" />
        <path
          className="line bottom"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        />
      </svg>
    </HamburgerWrapper>
  )
}

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
    allWpMenu(filter: { locations: { eq: EXPANDED } }) {
      edges {
        node {
          id
          name
          slug
          menuItems {
            nodes {
              id
              title
              target
              label
              url
              databaseId
              linkRelationship
            }
          }
          databaseId
        }
      }
    }
  }
`
const Item = styled.div`
  //
`

const Menu = () => {
  return (
    <StaticQuery
      query={MENU_QUERY}
      render={data => {
        const menu = get(data, "allWpMenu.edges[0].node")
        if (menu) {
          const menuItems = get(menu, "menuItems.nodes", [])
          const wordPressUrl = data.site.siteMetadata.siteUrl

          const [open, setOpen] = useState(false)

          return (
            <MenuWrapper>
              <Hamburger opened={open} onClick={setOpen} />
              <div className={`menu-items ${open ? "opened" : "closed"}`}>
                {menuItems &&
                  menuItems.map(menuItem => (
                    <Item key={getKey()}>
                      <MenuItem
                        menuItem={menuItem}
                        wordPressUrl={wordPressUrl}
                      />
                    </Item>
                  ))}
              </div>
            </MenuWrapper>
          )
        }
        return null
      }}
    />
  )
}

export default Menu
