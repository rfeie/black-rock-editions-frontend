import React from "react"
import { graphql } from "gatsby"

import Theme from "../components/Theme"
import Layout from "../components/layout"
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

const FeaturedImage = ({ src }) => {
  return (
    <section>
      <img src={src} />
    </section>
  )
}
const PageTemplate = props => {
  const post = props.data.wordpressPage
  const featuredImage = post.featured_media
    ? post.featured_media.source_url
    : null
  const siteTitle = props.data.site.siteMetadata.title

  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <ContentWrapper>
          {featuredImage ? <FeaturedImage src={featuredImage} /> : null}
          <h1>{post.title}</h1>

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
    wordpressPage(id: { eq: $id }) {
      slug
      title
      id
      featured_media {
        source_url
      }
      content
    }
  }
`
