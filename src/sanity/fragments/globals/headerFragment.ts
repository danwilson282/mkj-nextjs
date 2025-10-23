import { groq } from 'next-sanity';
import { colourFragment } from '../objects/colourFragment';

export const headerFragment = groq`
        _id, 
        siteTitle,
        "logo": logo.asset->url,
        backgroundColour{
        ${colourFragment}
        }
`;
