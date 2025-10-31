import { groq } from 'next-sanity';
export const iconFragment = groq`
        _type,
        icon,
        color,
        size
`;
