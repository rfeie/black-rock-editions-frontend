import React from "react"
import { graphql, Link } from "gatsby"
import get from "lodash/get"
import Img from "gatsby-image"
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

const PageTitle = styled.h1`
font-family: 'EB Garamond';
    letter-spacing: 6px;
    text-transform: uppercase;
    font-weight: 200;
    font-size: 5em;
    line-height: .5;
}
`

const ArtistName = styled.h2`
font-family: 'EB Garamond';
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 200;
}
`
const AllArtistSection = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(400px, min-content);
  column-gap: 10px;
  row-gap: 15px;
`

const ArtistSection = styled.section`
  padding: 10px;
  display: flex;
  margin-right: 10px;

  &:nth-child(2n) {
    border-left: 1px solid white;
    padding-left: 20px;
    margin-right: 0px;
  }
  & > * {
    flex: 1;
  }
  a {
    text-decoration: none;
  }
  h2 {
    font-size: 35px;
  }
  &.image {
  }
  &.excerpt_image {
  }
  .image-section {
    width: 40%;
    height: 100%;
    position: relative;
    overflow: hidden;
    a {
      width: 100%;
    }
    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
  .excerpt {
    font-size: 14px;
    padding-right: 5px;
  }
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

  const artists = get(props, "data.allWordpressWpArtist.edges", []).map(
    ({ node }) => {
      const {
        acf: { preview_image, preview_text },
        path,
        id,
        title,
      } = node
      const { title: workTitle, alt_text, source_url } = preview_image || {}
      return {
        path,
        title,
        id,
        image: preview_image,
        excerpt: preview_text,
      }
    }
  )
  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <ContentWrapper>
          {featuredImage ? <FeaturedImage src={featuredImage} /> : null}
          <PageTitle>{post.title}</PageTitle>

          <section dangerouslySetInnerHTML={{ __html: post.content }}></section>
          <AllArtistSection>
            {artists.map(artist => {
              const { path, title, image, excerpt, id } = artist
              return (
                <ArtistSection
                  key={id}
                  className={[excerpt ? "excerpt" : "", image ? "image" : ""]
                    .filter(Boolean)
                    .join("_")}
                >
                  <div>
                    <Link to={path}>
                      <ArtistName>{title}</ArtistName>
                    </Link>

                    <div className="excerpt">{excerpt}</div>
                  </div>

                  {image ? (
                    <div className="image-section">
                      <Link to={path}>
                        <Img fluid={image.localFile.childImageSharp.fluid} />
                      </Link>
                    </div>
                  ) : null}
                </ArtistSection>
              )
            })}
          </AllArtistSection>
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query ArtistsPageByID($id: String!) {
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
    allWordpressWpArtist(sort: { fields: menu_order, order: ASC }) {
      edges {
        node {
          id
          slug
          path
          title
          type

          fields {
            deploy
          }
          acf {
            name
            preview_text

            preview_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1400) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          wordpress_id
        }
      }
    }
  }
`
