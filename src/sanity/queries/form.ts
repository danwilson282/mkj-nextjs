import { groq } from 'next-sanity';
import { pageMetaFragment } from '../fragments/objects/pageMetaFragment';
import { layoutFragment } from '../fragments/objects/layoutFragment';

export const formsQuery = groq`
  *[_type == "form" && defined(slug.current){
    title,
    pageMeta{
      ${pageMetaFragment}
    },
    layout{
      ${layoutFragment}
    },
  }
  `;

export const formQuery = groq`
  *[_type == "form" && _id==$id][0]{
    title,
    slug,
    intro,
    fields[],
    submitText,
    submittedText,
    outro,
    pageMeta{
      ${pageMetaFragment}
    },
    layout{
      ${layoutFragment}
    },
  }
  `;
