import { groq } from 'next-sanity';

export const textBlockFragment = groq`
        _type,
        title,
        content
`;
