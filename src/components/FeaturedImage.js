import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"

const FeaturedImageWrapper = styled.section`
  width: 100%;
  max-height: 20em;
  overflow: hidden;
  margin-bottom: 1.5em;
`

const FeaturedImage = ({ image }) => {
  return (
    <FeaturedImageWrapper>
      <Img fluid={image.localFile.childImageSharp.fluid} />
    </FeaturedImageWrapper>
  )
}

export default FeaturedImage
