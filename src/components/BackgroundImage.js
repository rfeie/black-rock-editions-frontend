import React from "react"
import { Link, useStaticQuery } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // z-index: -1;
`

const Panel = styled.div`
  position: absolute;
  ${props => props.dir}: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height};
  // z-index: -1;
//   background: linear-gradient(
//     to ${props => props.dir},
//     transparent,
//     black 25%,
//     black
//   );
    // background: black;
`

const BkgImg = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.backgroundSrc}) 0 / cover fixed;
  // z-index: -1;
  filter: blur(2px);
  transform: scale(1.005);
`

const BackgroundImage = ({ backgroundSrc }) => {
  return (
    <Wrapper>
      <BkgImg backgroundSrc={backgroundSrc} />
      <Panel dir={"top"} dirOpp={"bottom"} height={"40%"} />
      <Panel dir={"bottom"} dirOpp={"top"} height={"10%"} />
    </Wrapper>
  )
}

export default BackgroundImage
