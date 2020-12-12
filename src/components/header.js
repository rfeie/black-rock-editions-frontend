import React from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import LogoSvg from "../assets/logo-cutout"

import bkg from "../assets/topobkg"
import Logo from "./logo"
import { getThemeVal, bold } from "../utils/styleUtils"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

const sharedStyles = `
z-index: 100;
padding: 10px;
position: fixed;
top: 0;
left: 0;
right: 0;
height: 50px;
`
const HeaderWrapper = styled.div``

const LogoWrapper = styled.section`
  height: 100%;
  display: flex;

  justify-content: space-between;
  svg {
    height: 100%;
    width: max-content;
  }
`
const HeaderContent = styled.header`
  ${sharedStyles}
  background: black;
`

const HeaderBkg = styled.div`
  ${sharedStyles}
  background: rgba(255, 255, 255, 0.75);
`

const Header = props => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  header = (
    <>
      <LogoWrapper>
        <Link to="/">
          <LogoSvg />
        </Link>
        <Menu />
      </LogoWrapper>
    </>
  )
  return (
    <HeaderWrapper>
      <HeaderBkg />
      <HeaderContent>{header}</HeaderContent>
    </HeaderWrapper>
  )
}

export default Header
