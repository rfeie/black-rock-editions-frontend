import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Theme from "../components/Theme"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { SignupButton } from "../components/newsletterform"
import styled from "styled-components"
const VALID = "valid"
const INVALID = "invalid"
const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  min-height: calc(100vh - 150px);
  width: 100%;
  max-width: 70%;
  margin: 0 auto;
  margin-top: 2em;
`

const HeadlineText = styled.h1`
  color: white;
  line-height: 1.5rem;
  font-size: 1.125rem;
  font-family: "EB Garamond";
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 1;
`
const SubheadText = styled.p`
  color: white;
  margin-top: 0.25rem;
  line-height: 1.25rem;
  font-size: 0.875rem;
`
const inputCss = `
appearance: none;
background-color: transparent;
border-color: #d2d6dc;
border-width: 2px;
// border-radius: .375rem;
padding: .5rem .75rem;
`

const InputWrapper = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  margin-top: 0.25rem;
  border-radius: 0.375rem;
  grid-area: 1 / 1 / 2 / 3;
`

const FieldInputsArea = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-column-gap: 1rem;
  column-gap: 1rem;
  grid-row-gap: 1.5rem;
  row-gap: 1.5rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`

const FieldWrapper = styled.div`
  grid-column: span ${props => props.span || 6} / span
    ${props => props.span || 6};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`
const Input = styled.input`
  line-height: 1.25rem;
  font-size: 0.875rem;
  width: 100%;
  display: block;
  padding: 0;
  line-height: inherit;
  color: inherit;
  overflow: visible;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
  &::placeholder {
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 1px;
  }
  ${inputCss}
`
const FormWrapper = styled.div`
  padding-top: 2rem;
  margin-top: 2rem;
`
const FormTag = styled.form`
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
`
const FormLabel = styled.label`
  --text-opacity: 1;
  color: #edf2f7;
  color: rgba(237, 242, 247, var(--text-opacity));
  line-height: 1.25rem;
  font-size: 0.875rem;
  font-weight: 300;
  margin-top: 0.125em;
  display: block;
  grid-area: 2 / 1 / 3 / 2;
`

const TextArea = styled.textarea`
  line-height: 1.25rem;
  font-size: 0.875rem;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  width: 100%;
  display: block;
  padding: 0;
  color: inherit;
  resize: vertical;
  overflow: auto;
  font-family: inherit;
  margin: 0;
  ${inputCss}
`

const ButtonWrapper = styled.span`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  margin-left: 0.75rem;
  display: inline-flex;
  border-radius: 0.375rem;
`

const SubmitArea = styled.div`
  border-color: #e5e7eb;
  padding-top: 1.25rem;
  margin-top: 2rem;
  border-top-width: 1px;
`
const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ErrorWrapper = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  justify-content: flex-end;
  color: #900;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 600;
`
const FormErrors = props => {
  const { fieldName, errors } = props
  const matchingErrors = errors.filter(({ field }) => field === fieldName)
  if (matchingErrors.length > 0) {
    return (
      <ErrorWrapper>
        {matchingErrors.map(({ error }) => {
          return <span key={`${name}__${error}`}>{error}</span>
        })}
      </ErrorWrapper>
    )
  }

  return null
}
const Form = props => {
  const {
    fieldData: {
      name_label,
      submit_text,
      email_label,
      subject_label,
      subject_placeholder,
      message_label,
    },
    headline,
    content,
    message,
    subject,
    name,
    email,
    errors,
    formStatus,
    setFormState,
    onSubmit,
  } = props

  return (
    <FormTag
      name="contact-message"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
    >
      <FormWrapper>
        <div>
          <HeadlineText>{headline}</HeadlineText>
          <SubheadText dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <FieldInputsArea>
          <FieldWrapper span="4">
            <InputWrapper>
              <Input id="name" value={name} onChange={setFormState("name")} />
            </InputWrapper>
            <FormLabel htmlFor="name">{name_label}</FormLabel>
            <FormErrors errors={errors} fieldName="name" />
          </FieldWrapper>
          <FieldWrapper span="4">
            <InputWrapper>
              <Input
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={setFormState("email")}
              />
            </InputWrapper>
            <FormLabel htmlFor="email">{email_label}</FormLabel>
            <FormErrors errors={errors} fieldName="email" />
          </FieldWrapper>
          <FieldWrapper>
            <InputWrapper>
              <Input
                id="subject"
                placeholder={subject_placeholder}
                value={subject}
                onChange={setFormState("subject")}
              />
            </InputWrapper>
            <FormLabel htmlFor="subject">{subject_label}</FormLabel>
            <FormErrors errors={errors} fieldName="subject" />
          </FieldWrapper>
          <FieldWrapper>
            <InputWrapper>
              <TextArea
                id="message"
                rows="4"
                value={message}
                onChange={setFormState("message")}
              ></TextArea>
            </InputWrapper>
            <FormLabel htmlFor="message"> {message_label} </FormLabel>
            <FormErrors errors={errors} fieldName="message" />
          </FieldWrapper>
        </FieldInputsArea>

        <SubmitArea>
          <ButtonArea>
            <ButtonWrapper>
              <SignupButton type="submit">
                {submit_text}
                <span></span>
              </SignupButton>
            </ButtonWrapper>
          </ButtonArea>
        </SubmitArea>
      </FormWrapper>
    </FormTag>
  )
}

const validateFormData = formState => {
  let state = VALID
  const errors = []
  const { message, subject, name, email } = formState
  if (!name) {
    state = INVALID
    errors.push({
      field: "name",
      error: "Name cannot be blank",
    })
  }

  if (!subject) {
    state = INVALID
    errors.push({
      field: "subject",
      error: "Subject cannot be blank",
    })
  }

  if (!message) {
    state = INVALID
    errors.push({
      field: "message",
      error: "Message cannot be blank",
    })
  }
  if (!/[^\s@,]+@[^\s@,]/.test(email)) {
    state = INVALID
    errors.push({
      field: "email",
      error: "Please enter a valid email address.",
    })
  }
  return {
    formStatus: state,
    errors,
  }
}
const getContactText = props => {
  const textlabelDefaults = [
    {
      additional_values_value: "Name",
      key_value: "name_label",
    },
    {
      additional_values_value: "Submit",
      key_value: "submit_text",
    },
    {
      additional_values_value: "Email",
      key_value: "email_label",
    },
    {
      additional_values_value: "Subject",
      key_value: "subject_label",
    },
    {
      additional_values_value: "What did you want to say?",
      key_value: "subject_placeholder",
    },
    {
      additional_values_value: "About",
      key_value: "message_label",
    },
  ]
  const page = props.data.wordpressPage
  const locationState = props.location.state || {}
  const { headline = "Contact", additional_layout = [] } = page.acf
  return {
    headline,
    content: page.content || "",
    message: locationState.messageText || "",
    subject: locationState.subjectText || "",
    fieldData: textlabelDefaults.reduce((acc, defaultData) => {
      const { additional_values_value, key_value } = defaultData
      const suppliedData = additional_layout.find(
        record => record.key_value === key_value
      )
      if (suppliedData) {
        acc[key_value] = suppliedData.additional_values_value
      } else {
        acc[key_value] = additional_values_value
      }
      return acc
    }, {}),
  }
}
const ContactPage = props => {
  const page = props.data.wordpressPage
  const title = page.title

  const formText = getContactText(props)
  const [formState, setState] = useState({
    message: formText.message,
    subject: formText.subject,
    name: "",
    email: "",
    formStatus: VALID,
    errors: [],
  })

  const onSubmit = e => {
    const validation = validateFormData(formState)
    if (validation.formStatus === INVALID) {
      e.preventDefault()
      setState({
        ...formState,
        ...validation,
      })
    }
  }
  return (
    <Theme>
      <Layout location={props.location} title={title}>
        <ContentWrapper>
          <Form
            {...formText}
            {...formState}
            setFormState={key => e => {
              const { value } = e.target
              setState({ ...formState, [key]: value })
            }}
            onSubmit={onSubmit}
          />
        </ContentWrapper>
      </Layout>
    </Theme>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        postPrefix
      }
    }
    wordpressPage(slug: { eq: "contact" }) {
      id
      title
      acf {
        headline
        additional_layout {
          additional_values_value
          key_value
        }
      }
      content
    }
  }
`