import get from "lodash/get"

export const getThemeVal = path => {
  return props => get(props, `theme.${path}`)
}

export const bold = () => `font-weight: 600;`
export const semibold = () => `font-weight: 500;`
export const regular = () => `font-weight: 400;`
