import { groq } from 'next-sanity';
import { colourFragment } from './colourFragment';

export const layoutFragment = groq`
        padding,
        alignment,
        justification,
        backgroundColor{
            colour {
                ${colourFragment}
            },
            opacity
        }
`;
