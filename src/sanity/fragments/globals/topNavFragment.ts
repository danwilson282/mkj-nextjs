
import { groq } from 'next-sanity'
import { linkFragment } from '../objects/linkFragment'

export const topNavFragment = groq`
        _id, 
        title,
        navLinks[]{
            ${linkFragment}
        },
`