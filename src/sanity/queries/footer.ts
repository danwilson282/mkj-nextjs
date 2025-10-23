import { groq } from 'next-sanity';
import { footerFragment } from '../fragments/globals/footerFragment';
export const footerQuery = groq`*[
  _type == "footer"
  && _id=="footer"
]
  [0]
{
  ${footerFragment}
}`;
