import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Theme from "../components/Theme"
import styled from "styled-components"

const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  min-height: calc(100vh - 150px);
  max-width: 70%;
  margin: 0 auto;
  margin-top: 4em;
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

const PostDate = styled.div`
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
const Divider = styled.hr`
  width: 100%;
  border-bottom: 1px solid darkgray;
`
const LinkWrapper = styled.div`
  a {
    color: lightgrey;
    text-decoration: none;
    font-size: 0.85em;
  }
`
const PostTemplate = props => {
  const post = props.data.wordpressPost
  const siteTitle = props.data.site.siteMetadata.title
  let featuredImage = false

  if (post.featured_media && post.featured_media.source_url) {
    featuredImage = post.featured_media.source_url
  }

  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <ContentWrapper>
          <PageTitle>{post.title} </PageTitle>
          {featuredImage && (
            <img
              src={featuredImage}
              alt={post.title}
              className="featured-image"
            />
          )}
          <div
            className="post-meta"
            style={{
              marginBottom: rhythm(1),
            }}
          >
            <PostDate className="post-date">{post.date}</PostDate>
            <LinkWrapper>
              <Link
                className="cat-link"
                to={`/category/${post.categories[0].slug}`}
              >
                Back to {post.categories[0].name}
              </Link>
            </LinkWrapper>
          </div>
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostById($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wordpressPost(id: { eq: $id }) {
      date(formatString: "MMMM DD, YYYY")
      slug
      title
      modified
      excerpt
      id

      categories {
        name
        slug
      }
      content
    }
  }
`
// featured_media {
//   source_url
// }
