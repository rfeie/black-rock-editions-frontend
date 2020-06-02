import React from "react"
import styled from "styled-components"
import NewsletterForm from "./newsletterform"
import { getThemeVal } from "../utils/styleUtils"

const SectionWrapper = styled.section`
  background: rgba(00, 0, 0, 0.95);
  max-width: 80%;
  margin: 2em auto;
  min-height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2.2px 2.6px rgba(0, 0, 0, 0.026),
    0 5.1px 6.1px rgba(0, 0, 0, 0.037), 0 9.1px 11px rgba(0, 0, 0, 0.046),
    0 15.1px 18.3px rgba(0, 0, 0, 0.054), 0 24.9px 30.2px rgba(0, 0, 0, 0.063),
    0 43.5px 52.7px rgba(0, 0, 0, 0.074), 0 94px 114px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  color: white;
`
const NewsletterWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`

const SectionContent = styled.div``

const TextWrapper = styled.div`
  flex: 1 1 0%;
`

const TextHeader = styled.h2`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`

const TextBody = styled.div`
  font-size: 1.125rem;
  color: #e2e8f0;
  max-width: 48rem;
  margin-top: 0.75rem;
  line-height: 1.5rem;
`

const FormWrapper = styled.div`
  margin-left: 2rem;
  margin-top: 0;
`
const Disclaimer = styled.div`
  font-size: 0.875rem;
  a {
    color: ${getThemeVal("colors.text")};
  }
`

const NewsletterContent = props => {
  const { headline, sections = {}, content } = props
  const { input_label, button_label, disclaimer } = sections
  return (
    <NewsletterWrapper>
      <TextWrapper>
        <TextHeader>{headline}</TextHeader>
        <TextBody dangerouslySetInnerHTML={{ __html: content }} />
      </TextWrapper>
      <FormWrapper>
        <NewsletterForm input_label={input_label} button_label={button_label} />
        <Disclaimer dangerouslySetInnerHTML={{ __html: disclaimer }} />
      </FormWrapper>
    </NewsletterWrapper>
  )
}

const NewsletterSection = props => {
  return (
    <SectionWrapper>
      <SectionContent>
        <NewsletterContent {...props} />
      </SectionContent>
    </SectionWrapper>
  )
}

export default NewsletterSection
