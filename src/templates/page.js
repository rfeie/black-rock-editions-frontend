import React from "react"
import { graphql } from "gatsby"

import Theme from "../components/Theme"
import Layout from "../components/layout"
import FeaturedImage from "../components/FeaturedImage"
import SEO from "../components/seo"
import styled from "styled-components"

const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 150px);
  max-width: 70%;
  margin: 0 auto;
`

const PageTitle = styled.h1`
font-family: 'EB Garamond';
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 200;
    font-size: 2em;
    line-height: 1;
    margin-bottom: .25em;
}
`

const PageTemplate = props => {
  const post = props.data.wpPage
  const featuredImage = post.featuredImage ? post.featuredImage.node : null
  const siteTitle = props.data.site.siteMetadata.title

  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <ContentWrapper>
          {featuredImage ? <FeaturedImage image={featuredImage} /> : null}
          <PageTitle>{post.title}</PageTitle>

          <section dangerouslySetInnerHTML={{ __html: post.content }}></section>
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageByID($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wpPage(id: { eq: $id }) {
      slug
      title
      id
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

      content
    }
  }
`
