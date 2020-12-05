import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import get from "lodash/get"

const FooterWrapper = styled.footer`
  background: black;
  padding: 20px 18px 15px 18px;
  color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  position: relative;
`

const FooterContent = styled.section`
  // text-transform: uppercase;
  font-size: 0.8em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 0px;
  grid-row-gap: 7px;
`

const ContactEmphasis = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
`

const ContactPassive = styled.div`
  letter-spacing: 0.5px;
`

const Copyright = styled.section`
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 300;
`
const ContactAndSocial = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 5px;
  line-height: 1.5;
`

const CONTACT_QUERY = graphql`
  query footerContactQuery {
    allWordpressWpBlackrockSection(
      filter: { slug: { in: ["contact-information", "social-information"] } }
    ) {
      edges {
        node {
          id
          slug
          acf {
            custom_content {
              content_name
              content_value
            }
            content
            headline
          }
        }
      }
    }
  }
`

const HeadlineText = styled.h6`
  font-family: "EB Garamond";
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 1;
  margin: 0 0 0.5rem 0;
`
const FooterContactContentText = styled.p``

const FooterContactHeadline = ({ text }) => {
  if (!text) return null

  return <HeadlineText>text</HeadlineText>
}
const FooterContactContent = ({ content }) => {
  if (!content) return null

  return (
    <FooterContactContentText dangerouslySetInnerHTML={{ __html: "content" }} />
  )
}

const ContactInfo = ({ node }) => {
  if (!node) return null

  const {
    acf: { headline, content, custom_content = [] },
  } = node
  return (
    <section key={node.id}>
      <FooterContactHeadline text={headline} />
      <section>
        {custom_content
          .filter(content => content && content.content_value)
          .map(({ content_name, content_value }) => {
            return (
              <div>
                {/* <ContactEmphasis>{content_name}:</ContactEmphasis> */}
                <ContactPassive>{content_value}</ContactPassive>
              </div>
            )
          })}
      </section>
      <FooterContactContent content={content} />
    </section>
  )
}

const SocialInfo = ({ node }) => {
  if (!node) return null
  const {
    acf: { headline, content, custom_content = [] },
  } = node
  return (
    <section key={node.id}>
      <FooterContactHeadline text={headline} />
      <section>
        {custom_content
          .filter(content => content && content.content_value)
          .map(({ content_name, content_value }) => {
            return (
              <ContactEmphasis>
                <a href={content_value} target="_blank">
                  {content_name}
                </a>
              </ContactEmphasis>
            )
          })}
      </section>
      <FooterContactContent content={content} />
    </section>
  )
}
const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <StaticQuery
          query={CONTACT_QUERY}
          render={data => {
            {
              const edges = get(
                data,
                "allWordpressWpBlackrockSection.edges",
                []
              )
              const social = edges.find(
                ({ node }) => node.slug === "social-information"
              )
              const contact = edges.find(
                ({ node }) => node.slug === "contact-information"
              )
              console.log("data, data", data)
              return (
                <ContactAndSocial>
                  <ContactInfo node={contact ? contact.node : null} />
                  <SocialInfo node={social ? social.node : null} />
                </ContactAndSocial>
              )
            }
          }}
        />
        <Copyright>©2020 Black Rock Editions</Copyright>
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer
