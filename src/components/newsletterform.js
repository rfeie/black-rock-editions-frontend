import React, { useState } from "react"
import styled from "styled-components"

export const SignupButton = styled.button`
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

const NewsletterForm = ({ input_label, button_label }) => {
  const [email, setEmail] = useState("")
  return (
    <FormTag
      name="newsletter"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={e => {
        if (!email) {
          e.preventDefault()
        }
      }}
      action="/signup-success"
    >
      <InputWrapper>
        <input type="hidden" name="form-name" value="newsletter" />
        <InputInnerWrapper>
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder=" "
            onChange={e => {
              e.preventDefault()
              setEmail(e.target.value)
            }}
          />
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
        <SignupButton
          type="submit"
          className="btn btn--border w-full flex items-center justify-center px-5 py-3"
        >
          {button_label}
          <span></span>
        </SignupButton>
      </ButtonWrapper>
    </FormTag>
  )
}
export default NewsletterForm
