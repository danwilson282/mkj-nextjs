import { groq } from 'next-sanity';

export const postFragment = groq`
        _id, 
        title, 
        slug, 
        image,
        publishedAt
`;
