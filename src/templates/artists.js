import React from "react"
import { graphql, Link } from "gatsby"
import get from "lodash/get"
import Img from "gatsby-image"
import FeaturedImage from "../components/FeaturedImage"
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
  min-height: calc(100vh - 211px);

  max-width: 100%;
  padding: 0 1rem;
  @media (min-width: 1024px) {
    max-width: 80%;
    margin: 0 auto;
  }
`

const PageTitle = styled.h1`
  font-family: "Inter", sans-serif;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 5em;
  line-height: 0.575;
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
  grid-auto-rows: minmax(400px, min-content);
  grid-template-columns: 1fr;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  column-gap: 10px;
  row-gap: 15px;
`

const ArtistSection = styled.section`
  padding: 10px 4rem;
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  width: 100%;
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
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0 2em;
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
    font-size: 16px;
    padding-right: 5px;
    font-weight: 300;
    margin-bottom: 1.45rem;
  }

  @media (min-width: 1024px) {
    padding: 10px;
    flex-direction: row;
    & > * {
      flex: 1;
    }
    .image-section {
      padding: 0;
      width: 40%;
    }

    &:nth-child(2n) {
      border-left: 1px solid white;
      padding-left: 20px;
      margin-right: 0px;
    }
  }
`

const PageTemplate = props => {
  const post = props.data.wpPage
  const featuredImage = post.featuredImage ? post.featuredImage.node : null
  const siteTitle = props.data.site.siteMetadata.title

  const artists = get(props, "data.allWpArtist.edges", []).map(({ node }) => {
    const {
      artist_works: { previewText, previewImage },
      uri,
      id,
      title,
    } = node
    const { title: workTitle, alt_text, source_url } = previewImage || {}
    return {
      uri,
      title,
      id,
      image: previewImage,
      excerpt: previewText,
    }
  })
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
              const { uri, title, image, excerpt, id } = artist
              return (
                <ArtistSection
                  key={id}
                  className={[excerpt ? "excerpt" : "", image ? "image" : ""]
                    .filter(Boolean)
                    .join("_")}
                >
                  <div>
                    <Link to={uri}>
                      <ArtistName>{title}</ArtistName>
                    </Link>

                    <div className="excerpt">{excerpt}</div>
                  </div>

                  {image ? (
                    <div className="image-section">
                      <Link to={uri}>
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
    allWpArtist(sort: { fields: menuOrder, order: ASC }) {
      edges {
        node {
          id
          slug
          uri
          title
          status
          databaseId
          artist_works {
            previewText
            previewImage {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1400) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
