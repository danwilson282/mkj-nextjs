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
        case 'columnLayout':
            //prefetch types in each column
            const preFetch = `
                  _type,
                  alignment,
                  columns[
                    _type=="column"
                  ]{
                    gap,
                    width,
                    sections[]{
                      _type
                    }
                  }
            `
            //populate
            //return
          return `_type=="columnLayout" => { ${preFetch} }`
        default:
          return ''
      }
    })
    .filter(Boolean)
    .join(',\n')
}
