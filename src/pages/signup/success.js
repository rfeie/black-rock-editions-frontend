import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Theme from "../../components/Theme"

import Layout from "../../components/layout"
const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 123px);
  max-width: 70%;
  margin: 0 auto;
`

const SignupSuccessPage = props => {
  const siteTitle = props.data.site.siteMetadata.title

  return (
    <Theme>
    <Layout location={props.location} title={siteTitle}>
      <ContentWrapper>
        <h1>You Signed up!</h1>
        <p>Talk to you soon.</p>
      </ContentWrapper>
    </Layout>
    </Theme>
  )
}

export default SignupSuccessPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
