import { groq } from 'next-sanity'

export const columnLayoutFragment = groq`
        alignment,
        columns[]{
            sections[]{_type}
        }
`