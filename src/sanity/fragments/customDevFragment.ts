import { groq } from 'next-sanity';

export const customDevFragment = groq`
      _type,
      "customDev": @-> {
        _id,
        title,
        _type,
        "slug": slug.current,
        information
      }
`;
