import React from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import LogoSvg from "../assets/logo-cutout"

import bkg from "../assets/topobkg"
import Logo from "./logo"
import { getThemeVal, bold } from "../utils/styleUtils"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  max-width: 90%;
  transform-style: preserve-3d;
  box-shadow: 0 2.2px 2.6px rgba(0, 0, 0, 0.026),
    0 5.1px 6.1px rgba(0, 0, 0, 0.037), 0 9.1px 11px rgba(0, 0, 0, 0.046),
    0 15.1px 18.3px rgba(0, 0, 0, 0.054), 0 24.9px 30.2px rgba(0, 0, 0, 0.063),
    0 43.5px 52.7px rgba(0, 0, 0, 0.074), 0 94px 114px rgba(0, 0, 0, 0.1);
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
`
const LogoWrapper = styled.section`
  min-width: 200px;
`
const HeaderFront = styled.div`
  padding: ${getThemeVal("spacing.sm")} ${getThemeVal("spacing.lg")};
  ${props =>
    bkg({
      backgroundColor: getThemeVal("colors.darkBackground")(props),
      accentColor: getThemeVal("colors.darkBackgroundAccent")(props),
    })}
  width: 100%;
  font-family: "Inter";
  ${bold()}
  border-radius: 2px;
  font-size: ${getThemeVal("fontSizes.sm")};
  color: ${getThemeVal("colors.text")};
  display: flex;
`

const HeaderBottom = styled.div`
  width: 100%;
  height: 15px;
  position: absolute;
  bottom: -15px;
  left: 0px;
  transform-style: preserve-3d;
  transform-origin: 0 0;
  background: linear-gradient(180deg, rgb(44, 46, 51) 5%, rgb(74, 81, 94) 100%);
  transform: skew(45deg, 0);
`
const HeaderRight = styled.div`
  width: 100%;
  background: red;
  position: absolute;
  right: -15px;

  top: 8px;

  width: 15px;
  background: linear-gradient(
    90deg,
    rgba(44, 46, 51, 1) 0%,
    rgba(74, 81, 94, 1) 57.9345238095238%
  );

  height: 100%;
  transform: skew(0, 45deg);
`
const Header = props => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  header = (
    <>
      <LogoWrapper>
        <LogoSvg />
      </LogoWrapper>

      <Menu />
    </>
  )
  return (
    <HeaderWrapper>
      <HeaderFront>{header}</HeaderFront>
      <HeaderRight />
      <HeaderBottom />
    </HeaderWrapper>
  )
}

export default Header
