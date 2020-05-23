import React from "react"
import styled from "styled-components"
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

const SectionContent = styled.div``

const SignupButton = styled.button`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-left: 1em;
  cursor: pointer;
  position: relative;
  border: 2px solid white;
  outline: none;
  color: white;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  white-space: nowrap;
  &::after,
  &::before,
  & span::after,
  & span::before {
    content: "";
    position: absolute;
    background-color: white;
    transition: 0.5s ease;
  }
  &::after,
  &::before,
  & span::after,
  & span::before {
    content: "";
    position: absolute;
    background-color: white;
    transition: 0.5s ease;
  }
  &::after,
  &::before {
    height: 100%;
    width: 2px;
    top: -2px;
  }
  &::after {
    left: -2px;
  }
  &::before {
    right: -2px;
  }
  & span::after,
  & span::before {
    height: 2px;
    width: 100%;
    left: -2px;
  }
  & span::after {
    top: -2px;
  }
  & span::before {
    bottom: -2px;
  }
  &:hover:after {
    transform: translateX(-12px);
  }
  &:hover:before {
    transform: translateX(12px);
  }
  &:hover span::after {
    transform: translateY(-12px);
  }
  &:hover span::before {
    transform: translateY(12px);
  }
  &:focus:after {
    transform: translateX(-12px);
  }
  &:focus:before {
    transform: translateX(12px);
  }
  &:focus span::after {
    transform: translateY(-12px);
  }
  &:focus span::before {
    transform: translateY(12px);
  }
  @media (max-width: 650px) {
    margin-left: 0;
    margin-top: 1em;
  }
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

const TextWrapper = styled.div`
  flex: 1 1 0%;
`

const TextHeader = styled.h2`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`

const TextBody = styled.p`
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
const FormTag = styled.form`
  display: flex;
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`

const ButtonWrapper = styled.div`
  margin-left: 0.75rem;
  margin-top: 0;
  flex-shrink: 0;
`
const InputWrapper = styled.div`
  color: white;
  &:nth-child(2) {
    margin-top: 30px;
  }
`
const InputInnerWrapper = styled.div`
  position: relative;
  .clip-second-outer {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .clip-second-inner {
    height: calc(100% - 4px);
    left: 2px;
    overflow: hidden;
    position: absolute;
    top: 2px;
    width: calc(100% - 4px);
  }
  .fill-second {
    transform: translateY(41px);
    transition: transform 300ms ease-in-out;
  }
  .fill-second-zigzag {
    background-repeat: repeat-x;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 32px;
  }
  .fill-second-zigzag1 {
    background: linear-gradient(-90deg, #000 16px, transparent 0),
      linear-gradient(90deg, #000 16px, transparent 0);
    background-position: 5px 0;
    background-repeat: repeat-x;
    background-size: 32px 32px;
  }
  .fill-second-rect1 {
    background: #fff;
    height: 50px;
    width: 100%;
  }
  .fill-second-zigzag2 {
    background: linear-gradient(-90deg, #4a515e 16px, transparent 0),
      linear-gradient(90deg, #4a515e 16px, transparent 0);
    background-position: 3px 3px;
    background-repeat: repeat-x;
    background-size: 32px 32px;
  }
  .fill-second-rect2 {
    background: #4a515e;
    height: 50px;
    width: 100%;
  }
  .fill-second-zigzag3 {
    background: linear-gradient(-90deg, #fff 16px, transparent 0),
      linear-gradient(90deg, #fff 16px, transparent 0);
    background-position: 3px 7px;
    background-repeat: repeat-x;
    background-size: 32px 32px;
  }
  .fill-second-rect3 {
    background: #fff;
    height: 50px;
    width: 100%;
  }
  input:focus ~ .clip-second-outer .fill-second,
  input:not(:placeholder-shown) ~ .clip-second-outer .fill-second {
    transform: translateY(-32px);
  }
  input:focus ~ .clip-second-inner .fill-second,
  input:not(:placeholder-shown) ~ .clip-second-inner .fill-second {
    transform: translateY(-32px);
  }
`

const TextInput = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 2px solid white;
  font-size: 20px;
  height: 50px;
  outline: none !important;
  width: 100%;
  padding-bottom: 4px;
  padding: 0 10px;
  position: relative;
  z-index: 1;
`
const Disclaimer = styled.div`
  font-size: 0.875rem;
  a {
    color: ${getThemeVal("colors.text")};
  }
`

const NewsletterContent = props => {
  console.log("NewsletterContent", props)
  const { headline, sections = {}, content } = props
  const { input_label, button_label, disclaimer } = sections
  return (
    <NewsletterWrapper>
      <TextWrapper>
        <TextHeader>{headline}</TextHeader>
        <TextBody dangerouslySetInnerHTML={{ __html: content }} />
      </TextWrapper>
      <FormWrapper>
        <FormTag
          name="newsletter"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <InputWrapper>
            <input type="hidden" name="form-name" value="newsletter" />
            <InputInnerWrapper>
              <TextInput type="text" placeholder=" " />
              <div className="clip-second-outer">
                <div className="fill-second">
                  <div className="fill-second-zigzag1 fill-second-zigzag"></div>
                  <div className="fill-second-rect1"></div>
                </div>
              </div>
              <div className="clip-second-inner">
                <div className="fill-second">
                  <div className="fill-second-zigzag2 fill-second-zigzag"></div>
                  <div className="fill-second-rect2"></div>
                </div>
              </div>
              <div className="clip-second-inner">
                <div className="fill-second">
                  <div className="fill-second-zigzag3 fill-second-zigzag"></div>
                  <div className="fill-second-rect3"></div>
                </div>
              </div>
            </InputInnerWrapper>
            {input_label}
          </InputWrapper>
          <ButtonWrapper>
            <SignupButton className="btn btn--border w-full flex items-center justify-center px-5 py-3">
              {button_label}
              <span></span>
            </SignupButton>
          </ButtonWrapper>
        </FormTag>
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
