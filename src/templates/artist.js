import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import FeaturedImage from "../components/FeaturedImage"

import Theme from "../components/Theme"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
const breakpoint = `
  @media (min-width: 1024px) {

  }
`
const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 211px);
  margin: 0 auto;
  margin-top: 2em;
  max-width: 90%;

  @media (min-width: 1024px) {
    max-width: 70%;
  }
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
  font-size: 16px;
  max-width: 900px;
  margin: 0.75em 1em 0.75em 3em;
`

const PageTemplate = props => {
  const post = props.data.wpArtist
  const works = props.data.allWpWork.edges
  const content = post.content
  const featuredImage = post.featuredImage ? post.featuredImage.node : null
  const siteTitle = props.data.site.siteMetadata.title
  console.log("on aritsts ", props.data)
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
                year,
              } = work.node.work_information
              const { uri, id } = work.node
              console.log("work", image)
              return (
                <Work key={id}>
                  <WorksImageWrapper>
                    <Link to={uri}>
                      <Img fluid={image.localFile.childImageSharp.fluid} />
                    </Link>
                  </WorksImageWrapper>

                  <section>
                    <WorkTitle>{work.title}</WorkTitle>
                    <section className="work-year">
                      {year} | {medium} | {dimensions} | {edition}
                    </section>
                    <Link to={uri}>view work</Link>
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
  query ArtistByID($id: Int!, $works: [String]) {
    site {
      siteMetadata {
        title
        author
      }
    }

    wpArtist(databaseId: { eq: $id }) {
      id
      content
      title
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
    }
    allWpWork(filter: { id: { in: $works } }) {
      edges {
        node {
          id
          uri
          work_information {
            dimensions
            edition
            fieldGroupName
            medium
            year
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 800) {
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
