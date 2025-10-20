import { groq } from 'next-sanity'
import { pageMetaFragment } from './objects/pageMetaFragment'
import { columnLayoutFragment } from './sections/columnLayout'
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
        sections[]{
                _type,
                _type == "columnLayout" => {
                                ${columnLayoutFragment}
                        }
                },
        pageMeta{
                ${pageMetaFragment}
        }
`