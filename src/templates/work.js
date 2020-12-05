import React, { useState } from "react"
import { graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"

import Theme from "../components/Theme"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 150px);
  max-width: 70%;
  margin: 0 auto;
  margin-top: 2em;
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

const Work = styled.section`
  min-width: 50%;
  margin: 2em 2em 0 2em;
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
`

const ArtistName = styled.h2`
  letter-spacing: 1.25px;
  text-transform: uppercase;
  color: lightgray;
  font-size: 0.8em;
  font-weight: 300;
  margin: 0;
  line-height: 2;
  a {
    text-decoration: none;
    color: lightgray;
    &:hover {
      text-decoration: underline;
    }
  }
`
const WorksImageWrapper = styled.div`
  min-width: 50%;
  img {
    width: 100%;
    margin-bottom: 1em;
  }
`
const ContactButton = styled.button`
  border: 0;
  padding: 0;
  outline: none;
  color: lightgray;
  background: transparent;
  margin-top: 0.75em;
  text-transform: uppercase;
  font-size: 0.75em;
  font-weight: 800;
  letter-spacing: 1px;
`
const FeaturedImage = ({ src }) => {
  return (
    <section>
      <img src={src} />
    </section>
  )
}
const PageTemplate = props => {
  const work = props.data.wordpressWpWork
  const artist = props.data.wordpressWpArtist
  const featuredImage = work.featured_media
    ? work.featured_media.source_url
    : null
  const siteTitle = props.data.site.siteMetadata.title
  const {
    title,
    acf: { dimensions, edition, image, medium, year },
  } = work

  console.log("image", props.data)
  return (
    <Theme>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={work.title} description={work.excerpt} />
        <ContentWrapper>
          {featuredImage ? <FeaturedImage src={featuredImage} /> : null}
          <Work>
            <ArtistName>
              <Link to={artist.path}>{artist.title}</Link>
            </ArtistName>
            <PageTitle>{title}</PageTitle>
            <section className="work-year">{year}</section>
            <section className="work-medium">{medium}</section>
            <section className="work-dimensions">{dimensions}</section>
            <section className="work-edition">{edition}</section>
            <ContactButton
              onClick={e => {
                e.preventDefault()
                navigate("contact", {
                  state: {
                    subjectText: `Interested in ${work.title}.`,
                    messageText: `I am interested in ${work.title} by ${artist.title} and would like to know more.`,
                  },
                })
              }}
            >
              Contact us about this piece &#187;
            </ContactButton>
            <section
              dangerouslySetInnerHTML={{ __html: work.content }}
            ></section>
          </Work>
          <WorksImageWrapper>
            {/* <img src={image[0]} /> */}
            <Img fluid={work.acf.image.localFile.childImageSharp.fluid} />
          </WorksImageWrapper>
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query workByID($id: Int!, $artistId: Int!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    wordpressWpArtist(wordpress_id: { eq: $artistId }) {
      id
      content
      path
      title
      #    featured_media {
      #       source_url
      #      }
    }
    wordpressWpWork(wordpress_id: { eq: $id }) {
      id
      title
      acf {
        dimensions
        edition

        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        medium
        year
      }
    }
  }
`
