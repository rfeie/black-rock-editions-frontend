import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import get from "lodash/get"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Theme from "../components/Theme"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import NewsletterSection from "../components/newslettersection"
import BackgroundImage from "../components/BackgroundImage"

const sharedContentStyles = `
  display: grid;
  grid-template-areas: "header ." ". copy";
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0 4em;

  
  }
  @media (max-width: 768px) {

    padding: 0 2em;
  }

  @media (max-width: 650px) {
    display: block;

  }

`
const HeroWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 70%;
  margin: 0 auto;
`

const HeroContent = styled.section`
  ${sharedContentStyles}
  z-index: 2;
  position: relative;
`
const HeroHeadline = styled.section`
  font-size: 5em;
  grid-area: header;
  font-weight: 700;
  letter-spacing: 2px;
  position: relative;
  display: flex;
  align-items: flex-end;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 20px 30px rgba(0, 0, 0, 0.4);
  line-height: 1.15;

  z-index: 4;
`
const HeroText = styled.section`
  grid-area: copy;
  font-size: 1.2em;
  font-weight: 200;
  line-height: 1.75;
  position: relative;
  text-align: right;
  text-shadow: rgba(0, 0, 0, 0.6) 0 5px 15px, rgba(0, 0, 0, 0.6) 0 20px 30px;
  letter-spacing: 0.5px;
  @media (max-width: 650px) {
    margin-top: 2em;
  }
`
const getNewsletterInfo = props => {
  const prefix = "data.allWpBlackrockSection.edges[0].node"
  return {
    headline: get(props, `${prefix}.blackrock_sections.headline`),
    sections: get(
      props,
      `${prefix}.blackrock_sections.customContent`,
      []
    ).reduce((acc, curr) => {
      const { contentName, contentValue } = curr
      acc[contentName] = contentValue
      return acc
    }, {}),
    content: get(props, `${prefix}.blackrock_sections.content`),
  }
}
const getPageInfo = props => {
  return {
    headline: get(props, "data.wpPage.custom_content.headline"),
    content: get(props, "data.wpPage.content"),
  }
}

const BlogIndex = props => {
  const { title, postPrefix } = props.data.site.siteMetadata
  const { headline, content } = getPageInfo(props)
  const result = get(props.data, "file.childImageSharp.fluid.src")

  return (
    <Theme>
      <Layout location={props.location} title={title}>
        <BackgroundImage backgroundSrc={result} />

        <SEO title="All posts" />
        <HeroWrapper>
          <HeroContent>
            <HeroHeadline>{headline}</HeroHeadline>
            <HeroText dangerouslySetInnerHTML={{ __html: content }} />
          </HeroContent>
        </HeroWrapper>
        <NewsletterSection {...getNewsletterInfo(props)} />
      </Layout>
    </Theme>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        postPrefix
      }
    }
    wpPage(uri: { eq: "/" }) {
      id
      content
      custom_content {
        headline
      }
    }
    allWpBlackrockSection(filter: { databaseId: { eq: 24 } }) {
      edges {
        node {
          id
          databaseId
          internal {
            type
          }
          blackrock_sections {
            content
            headline
            customContent {
              contentName
              contentValue
            }
          }
        }
      }
    }
  }
`
// featured_media {
//   source_url
// }
