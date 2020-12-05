import React from "react"
import { Link, graphql } from "gatsby"
import Theme from "../components/Theme"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  min-height: calc(100vh - 150px);
  max-width: 70%;
  margin: 0 auto;
  margin-top: 2em;
`
const PageTitle = styled.h1`
    letter-spacing: 4px;
    font-size: 2em;
    line-height: 1;
    margin-bottom: .25em;
    font-family: 'Inter', sans-serif;
    letter-spacing: 6px;
    text-transform: uppercase;
    font-weight: 600;
}
`

const Divider = styled.hr`
  width: 100%;
  border-bottom: 1px solid darkgray;
`

const PostDate = styled.small`
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.5px;
  font-size: 0.65em;
  color: grey;
`

const PostTitle = styled.h3`
  font-family: "EB Garamond";
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 200;
  font-size: 1.2em;
  color: lightgrey;
  margin-bottom: 0.25em;
  a {
    color: lightgrey;
    text-decoration: none;
  }
`

const CategoryTemplate = props => {
  const { title, postPrefix } = props.data.site.siteMetadata
  const posts = props.data.allWordpressPost.edges
  // test
  return (
    <Theme>
      <Layout location={props.location} title={title}>
        <SEO
          title={`Archive | ${props.pageContext.name}`}
          description={`Archive for ${props.pageContext.name} category`}
        />
        <ContentWrapper>
          <PageTitle>{props.pageContext.name}</PageTitle>
          <Divider />
          {posts.map(({ node }) => {
            return (
              <div key={node.slug}>
                <PostTitle>
                  <Link
                    style={{ boxShadow: `none` }}
                    to={`${postPrefix}/${node.slug}`}
                  >
                    {node.title}
                  </Link>
                </PostTitle>
                <PostDate>{node.date}</PostDate>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                />
              </div>
            )
          })}
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query category($slug: String) {
    site {
      siteMetadata {
        title
        author
        postPrefix
      }
    }
    allWordpressPost(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          modified
          excerpt
          id
          categories {
            name
            id
            slug
          }
          content
        }
      }
    }
  }
`
