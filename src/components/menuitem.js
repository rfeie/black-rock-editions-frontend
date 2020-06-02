import React from "react"
import { CreateLocalLink, isLocal } from "../utils"
import { Link } from "gatsby"
import styled from "styled-components"
import { getThemeVal, bold } from "../utils/styleUtils"
import { getKey } from "../utils"

const MenuItemLink = styled(Link)`
  color: ${getThemeVal("colors.text")};
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.5px;
`
const MenuItemAnchor = styled.a`
  color: ${getThemeVal("colors.text")};
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.5px;
`

const MenuItem = ({ menuItem, wordPressUrl }) => {
  const { url } = menuItem
  const localUrl = isLocal(url, wordPressUrl)
  const formattedUrl = localUrl ? CreateLocalLink(menuItem, wordPressUrl) : url
  const Wrapper = localUrl ? MenuItemLink : MenuItemAnchor
  const args = localUrl
    ? {
        to: formattedUrl,
      }
    : {
        href: formattedUrl,
        target: "_blank",
      }
  return (
    <Wrapper key={getKey()} {...args}>
      {menuItem.label}
    </Wrapper>
  )
}

export default MenuItem
