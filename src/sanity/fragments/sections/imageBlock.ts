import { groq } from 'next-sanity';
import { layoutFragment } from '../objects/layoutFragment';
export const imageBlockFragment = groq`
        _type,
        title,
        "image": image.asset->,
        width,
        height,
        radius,
        shadow,
        zoom,
        layout{
            ${layoutFragment}
        }
`;
