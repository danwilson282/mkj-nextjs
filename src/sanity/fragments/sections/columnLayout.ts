import { groq } from 'next-sanity';
import { layoutFragment } from '../objects/layoutFragment';
export const columnLayoutFragment = groq`
        alignment,
        columns[]{
            width,
            gap,
            sections[]{_type}
        },
        layout{
            ${layoutFragment}}
`;
