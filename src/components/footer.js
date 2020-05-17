import React from "react"
import styled from "styled-components"
const FooterWrapper = styled.footer`
  background: black;
  padding: 30px 20px;
  margin-top: 1em;
  height: 50px;
  color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  position: relative;
`

const FooterContent = styled.section`
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 2px;
`

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>©2020 Black Rock Editions</FooterContent>
    </FooterWrapper>
  )
}

export default Footer
