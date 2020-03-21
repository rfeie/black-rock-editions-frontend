import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Wrapper = styled.section`
  grid-area: logo;
  max-height: 46px;
  img {
    max-height: 46px;
    width: 100%;
  }
`
const query = graphql`
  query LogoQuery {
    file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
                      ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

function Logo(props) {
  console.log(props)
  const data = {}
  return (
    <div>
      <StaticQuery
        query={query}
        render={data => {
          return (
            <div
            >
              <Img fluid={data.file.childImageSharp.fluid} imgStyle={{}} />
            </div>
          )
        }}
      />
    </div>
  )
}

export default Logo
