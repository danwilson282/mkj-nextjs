import { groq } from 'next-sanity'
import { pageMetaFragment } from './objects/pageMetaFragment'

export const pageFragment = groq`
        _id, 
        title, 
        slug, 
        sections,
        pageMeta
`

export const pageMiniFragment = groq`
        _id, 
        title, 
        slug, 
        sections[]{_type},
        pageMeta{
                ${pageMetaFragment}
        }
`