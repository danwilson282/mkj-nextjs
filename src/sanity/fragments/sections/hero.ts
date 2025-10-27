import { groq } from 'next-sanity';
import { layoutFragment } from '../objects/layoutFragment';
export const heroFragment = groq`
        _type,
        heading,
        tagline,
        layout{
            ${layoutFragment}
        }
`;
