import { groq } from 'next-sanity';
import { colourFragment } from '../objects/colourFragment';
import { layoutFragment } from '../objects/layoutFragment';
export const iconFragment = groq`
        _type,
        icon,
        colour {
            ${colourFragment}
        },
        size,
        layout{
            ${layoutFragment}
        }
`;
