import React from "react"
import { graphql, Link } from "gatsby"
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
  min-height: calc(100vh - 150px);
  max-width: 70%;
  margin: 0 auto;
  margin-top: 2em;
`

const PageTitle = styled.h1`
font-family: 'EB Garamond';
text-align: center;
    letter-spacing: 6px;
    text-transform: uppercase;
    font-weight: 200;
    font-size: 3em;
    line-height: 1;
}
`
const WorkTitle = styled.h2`
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.75;
    margin: 0;
}
`
const WorksContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ArtistMainContainer = styled.section`
  margin-bottom: 2em;
`
const WorksImageWrapper = styled.div`
  // max-width: 50%;
  display: flex;
  justify-content: flex-end;
  img {
    width: 100%;
    margin-bottom: 1em;
  }
  a {
    width: 100%;
  }
`
const Work = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 1em 1em 1em;
  max-width: 40%;
  .work-year {
    font-weight: 300;
    font-size: 13px;
  }

  .work-medium {
    font-weight: 300;
    font-size: 13px;
  }
  .work-dimensions {
    font-weight: 300;
    font-size: 13px;
  }
  .work-edition {
    font-weight: 300;
    font-size: 13px;
  }
  a {
    text-transform: lowercase;
    font-size: 0.8em;
    letter-spacing: 0.25px;
    color: lightgray;
  }
`
const WordpressContent = styled.section`
  font-size: 0.9em;
  max-width: 900px;
`

const PageTemplate = props => {
  const post = props.data.wordpressWpArtist
  const works = props.data.allWordpressWpWork.edges
  const content = post.content
  const featuredImage = post.featured_media ? post.featured_media : null
  const siteTitle = props.data.site.siteMetadata.title
  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <ContentWrapper>
          <ArtistMainContainer>
            {featuredImage ? <FeaturedImage image={featuredImage} /> : null}
            <PageTitle>{post.title}</PageTitle>
            <WordpressContent dangerouslySetInnerHTML={{ __html: content }} />
          </ArtistMainContainer>

          <WorksContainer>
            {works.map(work => {
              const {
                dimensions,
                edition,
                image,
                medium,
                name,
                year,
              } = work.node.acf
              const { path, id } = work.node
              console.log("work", image)
              return (
                <Work key={id}>
                  <WorksImageWrapper>
                    <Link to={path}>
                      <Img fluid={image.localFile.childImageSharp.fluid} />
                    </Link>
                  </WorksImageWrapper>

                  <section>
                    <WorkTitle>{name}</WorkTitle>
                    <section className="work-year">
                      {year} | {medium} | {dimensions} | {edition}
                    </section>
                    <Link to={path}>view work</Link>
                  </section>
                </Work>
              )
            })}
          </WorksContainer>
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query ArtistByID($id: Int!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    wordpressWpArtist(wordpress_id: { eq: $id }) {
      id
      acf {
        name
      }
      content
      title
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    allWordpressWpWork(
      filter: { acf: { artist: { elemMatch: { wordpress_id: { eq: $id } } } } }
    ) {
      edges {
        node {
          id
          path
          acf {
            dimensions
            edition

            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            medium
            name
            year
          }
        }
      }
    }
  }
`
