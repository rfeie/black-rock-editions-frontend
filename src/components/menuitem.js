import React from "react"
import { CreateLocalLink } from "../utils"
import { Link } from "gatsby"
import styled from "styled-components"
import { getThemeVal, bold } from "../utils/styleUtils"

const MenuItemLink = styled(Link)`
  color: ${getThemeVal("colors.text")};
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.5px;
`

const MenuItem = ({ menuItem, wordPressUrl }) => {
  return (
    <MenuItemLink to={CreateLocalLink(menuItem, wordPressUrl)}>
      {menuItem.label}
    </MenuItemLink>
  )
}

export default MenuItem
