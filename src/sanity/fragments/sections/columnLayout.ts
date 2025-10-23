import { groq } from 'next-sanity';

export const columnLayoutFragment = groq`
        alignment,
        columns[]{
            width,
            gap,
            sections[]{_type}
        }
`;
