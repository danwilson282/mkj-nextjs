import { groq } from 'next-sanity'
import { pageMiniFragment } from '../fragments/pageFragment'
import { getSections } from '../helpers/getSectionsQuery'
import { pageMetaFragment } from '../fragments/objects/pageMetaFragment'
import { layoutFragment } from '../fragments/objects/layoutFragment'
export const pagesQuery = groq`*[
  _type == "page"
  && defined(slug.current)
]
  |order(publishedAt desc)
  [0...12]
{
  ${pageMiniFragment}
}`

export const pageQuery = (includedSections: string[])=> groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    sections[]{
      ${getSections(includedSections)}
    },
    pageMeta{
      ${pageMetaFragment}
    },
    layout{
      ${layoutFragment}
    },
    parent->{
      ${pageMiniFragment}
    }
  }
  `

export const pagePreQuery = groq`*[
  _type == "page"
  && slug.current == $slug
][0]
{
  ${pageMiniFragment}
}`