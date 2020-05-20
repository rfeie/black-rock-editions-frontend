import React from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import Header from "./header"
import Footer from "./footer"

import "@wordpress/block-library/build-style/style.css"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

const Wrapper = styled.section`
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f7fa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23e4e7eb' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
`

const Main = styled.main`
  min-height: calc(100vh - 50px);
  padding-top: 49px;
`
const BkgImg = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://uploads.codesandbox.io/uploads/user/c1283644-8b77-42b2-bdfe-a50a5ef45af8/338o-stone-background.jpg)
    0 / cover fixed;
  // z-index: -1;
  filter: blur(2px);
  transform: scale(1.005);
`

const Layout = props => {
  const { location, title, children } = props

  return (
    <Wrapper>
      <Header location={location} title={title} />
      <Main>
        {" "}
        <BkgImg />
        {children}
        <Footer></Footer>
      </Main>
    </Wrapper>
  )
}

export default Layout
