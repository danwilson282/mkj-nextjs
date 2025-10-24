import { groq } from 'next-sanity';
import { headerFragment } from '../fragments/globals/headerFragment';
export const headerQuery = groq`*[
  _type == "header"
  && _id=="header"
]
  [0]
{
  ${headerFragment}
}`;
