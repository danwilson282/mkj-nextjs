import { groq } from 'next-sanity';
import { linkFragment } from '../objects/linkFragment';
import { layoutFragment } from '../objects/layoutFragment';
export const ctaFragment = groq`
        _type,
        link {
            ${linkFragment}},
        colour,
        variant,
        size,
        layout{
            ${layoutFragment}
        }
`;
