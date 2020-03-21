import React from "react"
import { ThemeProvider } from "styled-components"
// import "./fonts/inter.css";
// rems, at 16px, so
const sizeScale = [
  0.25, // 4px
  0.5, // 8px
  0.75, // 12px
  1, // 16px
  1.5,
  2,
  3,
  4,
  6,
  8,
  12,
  16,
  24,
  32,
  30,
  48,
]

const fontScale = [
  0.75, // 12px
  0.875, // 14px
  1, // 16px
  1.125, // 18px
  1.25, // 20px
  1.5, // 24px
  1.875, //30px
  2.25, // 36px
  3, // 48px
  3.75, // 60px
  4.5, // 72px
]
const fontSizes = {
  xxsm: `0.75rem`, // 12px
  xsm: `0.875rem`, // 14px
  sm: `1rem`, // 16px
  mdsm: `1.125rem`, // 18px
  md: `1.25rem`, // 20px
  mdlg: `1.5rem`, // 24px
  lg: `1.875rem`, //30px
  xxl: `2.25rem`, // 36px
  xxxl: `3rem`, // 48px
  xxxxl: `3.75rem`, // 60px
  huge: `4.5rem`, // 72px
}

const theme = {
  colors: {
    darkBackground: "#2c2e33",
    darkBackgroundAccent: "#4a515e",
    text: "#f5f7fa",
  },
  fonts: ["sans-serif", "Inter"],
  fontSizes,
  spacing: {
    xxsm: `${sizeScale[0]}rem`,
    xsm: `${sizeScale[1]}rem`,
    sm: `${sizeScale[2]}rem`,
    md: `${sizeScale[3]}rem`,
    lg: `${sizeScale[4]}rem`,
    xl: `${sizeScale[5]}rem`,
    xxl: `${sizeScale[6]}rem`,
  },
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
