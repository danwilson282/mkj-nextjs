import { groq } from 'next-sanity';
import { pageMiniFragment } from '../pageFragment';

export const linkFragment = groq`
        internalLink->{
            ${pageMiniFragment}
        },
        externalUrl,
        label,
        linkType

`;
