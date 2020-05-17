import React from "react"
import { Link, graphql } from "gatsby"
import get from 'lodash/get'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Theme from "../components/Theme"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import NewsletterSection from "../components/newslettersection"
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
const HeroContentShadowOne = styled.section`
  ${sharedContentStyles}
  position: fixed;
  mix-blend-mode: soft-light;
  margin: -20% 0 0 -20%;
  opacity: 0.75;
  filter: blur(2px);
`
const HeroContentShadowTwo = styled.section`
  ${sharedContentStyles}
  position: fixed;
  mix-blend-mode: color-burn;
  margin: 20% 0 0 43%;
  filter: blur(2px);
  mix-blend-mode: color-burn;
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
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 20px 30px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.5px;
`
const getPageInfo = (props) => {
  return {
    headline: get(props, 'data.wordpressPage.acf.headline'),
    content: get(props, 'data.wordpressPage.content')
    
  }
}
const BlogIndex = props => {
  const { title, postPrefix } = props.data.site.siteMetadata
  const posts = props.data.allWordpressPost.edges
  console.log('props.data', props.data)
  const {headline, content} = getPageInfo(props)
  return (
    <Theme>
      <Layout location={props.location} title={title}>
        <SEO title="All posts" />
        <HeroWrapper>
          <HeroContent>
            <HeroHeadline>{headline}</HeroHeadline>
            <HeroText dangerouslySetInnerHTML={{__html: content}}/>
          </HeroContent>
        </HeroWrapper>
        <NewsletterSection />
        {/* <Bio />
        {posts.map(({ node }) => {
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: `none` }}
                  to={`${postPrefix}/${node.slug}`}
                >
                  {node.title}
                </Link>
              </h3>
              <small>{node.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          )
        })} */}
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
    wordpressPage(path: {eq: "/"}) {
      id
      acf {
        headline
      }
      content
    }
  
    allWordpressPost(filter: { fields: { deploy: { eq: true } } }, limit: 100) {
      edges {
        node {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          excerpt
          id
          categories {
            name
          }
        }
      }
    }
  }
`
// featured_media {
//   source_url
// }
