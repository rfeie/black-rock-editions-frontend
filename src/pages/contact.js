import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Theme from "../components/Theme"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { SignupButton } from "../components/newsletterform"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import styled from "styled-components"
const VALID = "valid"
const INVALID = "invalid"
const ContentWrapper = styled.section`
  position: relative;
  color: #f5f7fa;
  min-height: calc(100vh - 211px);
  width: 100%;
  max-width: 70%;
  margin: 0 auto;
  margin-top: 2em;
`

const HeadlineText = styled.h1`
  color: white;
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

const LeafletWrapper = styled.section`
  height: 400px;
  margin: 2em 0;
  position: relative;
  z-index: 0;
  & > * {
    width: 100%;
    max-width: 1000px;
    height: 400px;
  }
`
const LeafletMap = () => {
  const position = [35.6628, -105.99537]
  return (
    <LeafletWrapper>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
      </MapContainer>
    </LeafletWrapper>
  )
}

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
      action="/signup-success"
      onSubmit={onSubmit}
    >
      <FormWrapper>
        <input type="hidden" name="form-name" value="contact-message" />
        <div>
          <HeadlineText>{headline}</HeadlineText>
          <SubheadText dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <FieldInputsArea>
          <FieldWrapper span="4">
            <InputWrapper>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={setFormState("name")}
              />
            </InputWrapper>
            <FormLabel htmlFor="name">{name_label}</FormLabel>
            <FormErrors errors={errors} fieldName="name" />
          </FieldWrapper>
          <FieldWrapper span="4">
            <InputWrapper>
              <Input
                name="email"
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
                name="subject"
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
                name="message"
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

const Divider = styled.hr`
  width: 100%;
  border-bottom: 1px solid darkgray;
`
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
      additionalValuesValue: "Name",
      keyValue: "name_label",
    },
    {
      additionalValuesValue: "Submit",
      keyValue: "submit_text",
    },
    {
      additionalValuesValue: "Email",
      keyValue: "email_label",
    },
    {
      additionalValuesValue: "Subject",
      keyValue: "subject_label",
    },
    {
      additionalValuesValue: "What did you want to say?",
      keyValue: "subject_placeholder",
    },
    {
      additionalValuesValue: "About",
      keyValue: "message_label",
    },
  ]
  const page = props.data.wpPage
  const locationState = props.location.state || {}
  const {
    custom_content: { headline = "Contact" },
    custom_page_layouts: { additionalLayout = [] },
  } = page

  // custom_page_layouts {
  //   additionalLayout {
  //     additionalValuesValue
  //     fieldGroupName
  //     keyValue
  //   }
  // }
  // custom_content {
  //   headline
  // }

  const fieldData = textlabelDefaults.reduce((acc, defaultData) => {
    const { additionalValuesValue, keyValue } = defaultData
    const suppliedData = additionalLayout.find(
      record => record.keyValue === keyValue
    )
    if (suppliedData) {
      acc[keyValue] = suppliedData.additionalValuesValue
    } else {
      acc[keyValue] = additionalValuesValue
    }
    return acc
  }, {})
  return {
    headline,
    content: page.content || "",
    message: locationState.messageText || "",
    subject: locationState.subjectText || "",
    fieldData,
    ...additionalLayout.reduce((acc, data) => {
      const { additionalValuesValue, keyValue } = data
      if (!fieldData[keyValue]) {
        acc[keyValue] = additionalValuesValue
      }
      return acc
    }, {}),
  }
}

const LocationInformation = ({ location_info_header, address }) => {
  return (
    <section>
      <HeadlineText>{location_info_header}</HeadlineText>

      <section>{address}</section>
      <LeafletMap />
    </section>
  )
}
const ContactPage = props => {
  const page = props.data.wpPage
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
          <Divider />
          <LocationInformation {...formText} />
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
    wpPage(uri: { eq: "/contact/" }) {
      id
      title
      content
      custom_content {
        headline
      }
      custom_page_layouts {
        additionalLayout {
          fieldGroupName
          keyValue
          additionalValuesValue
        }
      }
    }
    allWpBlackrockSection(filter: { slug: { in: ["contact-information"] } }) {
      edges {
        node {
          id
          slug
          blackrock_sections {
            fieldGroupName
            customContent {
              contentName
              fieldGroupName
              contentValue
            }
            content
            headline
          }
        }
      }
    }
  }
`
