import { groq } from 'next-sanity';

export const pageMetaFragment = groq`
        metaTitle,
        metaDescription,
        canonicalUrl,
        metaKeywords,
        noIndex,
        noFollow

`;
