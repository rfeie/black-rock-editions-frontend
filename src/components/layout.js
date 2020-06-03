import React from "react"
import { Link, useStaticQuery } from "gatsby"
import get from "lodash/get"
import Menu from "./menu"
import Header from "./header"
import Footer from "./footer"

import "@wordpress/block-library/build-style/style.css"
import { rhythm, scale } from "../utils/typography"
import styled, { createGlobalStyle } from "styled-components"
const query = graphql`
  query BackgroundQuery {
    file(absolutePath: { regex: "/background.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Inter", sans-serif;
}
`
const Wrapper = styled.section`
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f7fa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23e4e7eb' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
`

const Main = styled.main`
  min-height: calc(100vh - 123px);
  padding-top: 49px;
`
const BkgImg = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.backgroundSrc}) 0 / cover fixed;
  // z-index: -1;
  filter: blur(2px);
  transform: scale(1.005);
`

const Layout = props => {
  const { location, title, children } = props
  const result = get(useStaticQuery(query), "file.childImageSharp.fluid.src")

  return (
    <Wrapper>
      <GlobalStyle />
      <Header location={location} title={title} />
      <Main>
        <BkgImg backgroundSrc={result} />
        {children}
        <Footer></Footer>
      </Main>
    </Wrapper>
  )
}

export default Layout
