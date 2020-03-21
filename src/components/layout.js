import React from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import Header from "./header"

import "@wordpress/block-library/build-style/style.css"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

const Wrapper = styled.section`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(23)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  background-color: #f5f7fa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23e4e7eb' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
`

const Main = styled.main`
  padding-top: 6rem;
`

const Layout = props => {
  const { location, title, children } = props

  return (
    <Wrapper>
      <Header location={location} title={title} />
      <Main>{children}</Main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Wrapper>
  )
}

export default Layout
