import { groq } from 'next-sanity';
import { topNavFragment } from '../fragments/globals/topNavFragment';
export const navigationQuery = groq`*[
  _type == "navigation"
  && _id=="navigation"
]
  [0]
{
  ${topNavFragment}
}`;
