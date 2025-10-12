import { heroFragment } from "../fragments/sections/hero"
import { textBlockFragment } from '../fragments/sections/textBlock'

export const getSections = (sectionTypes: string[]): string => {
  return sectionTypes
    .map(type => {
      switch (type) {
        case 'hero':
          return `_type == "hero" => { ${heroFragment} }`
        case 'textBlock':
          return `_type == "textBlock" => { ${textBlockFragment} }`
        default:
          return ''
      }
    })
    .filter(Boolean)
    .join(',\n')
}
