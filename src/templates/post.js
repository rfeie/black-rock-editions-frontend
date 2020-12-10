import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FeaturedImage from "../components/FeaturedImage"
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
  const post = props.data.wpPost
  const siteTitle = props.data.site.siteMetadata.title
  const featuredImage = post.featuredImage ? post.featuredImage.node : null

  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <ContentWrapper>
          <PageTitle>{post.title} </PageTitle>
          {featuredImage ? <FeaturedImage image={featuredImage} /> : null}

          <div
            className="post-meta"
            style={{
              marginBottom: rhythm(1),
            }}
          >
            <PostDate className="post-date">{post.date}</PostDate>
            {post.categories.nodes[0] ? (
              <LinkWrapper>
                <Link
                  className="cat-link"
                  to={`/category/${post.categories.nodes[0].slug}`}
                >
                  Back to {post.categories.nodes[0].name}
                </Link>
              </LinkWrapper>
            ) : null}
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
    wpPost(id: { eq: $id }) {
      date(formatString: "MMMM DD, YYYY")
      slug
      title
      modified
      excerpt
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

      categories {
        nodes {
          name
          id
          slug
        }
      }
      content
    }
  }
`
// featured_media {
//   source_url
// }
