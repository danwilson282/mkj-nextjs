import { groq } from 'next-sanity'
import { postFragment } from '../fragments/postFragment'
export const postsQuery = groq`*[
  _type == "post"
  && defined(slug.current)
]
  |order(publishedAt desc)
  [0...12]
{
  ${postFragment}
}`

export const postQuery = groq`*[
  _type == "post"
  && slug.current == $slug
][0]
{
  ${postFragment}
}`