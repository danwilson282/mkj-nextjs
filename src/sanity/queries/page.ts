import { groq } from 'next-sanity'
import { pageMiniFragment } from '../fragments/pageFragment'
export const pagesQuery = groq`*[
  _type == "page"
  && defined(slug.current)
]
  |order(publishedAt desc)
  [0...12]
{
  ${pageMiniFragment}
}`

export const pagePreQuery = groq`*[
  _type == "page"
  && slug.current == $slug
][0]
{
  ${pageMiniFragment}
}`