import { groq } from 'next-sanity'

export const pageFragment = groq`
        _id, 
        title, 
        slug, 
        sections
`

export const pageMiniFragment = groq`
        _id, 
        title, 
        slug, 
        sections[]{_type}
`