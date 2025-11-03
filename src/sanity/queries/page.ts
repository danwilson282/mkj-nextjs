import { groq } from 'next-sanity';
import { pageMiniFragment, pageUrlFragment } from '../fragments/pageFragment';
import { getSections } from '../helpers/getSectionsQuery';
import { pageMetaFragment } from '../fragments/objects/pageMetaFragment';
import { layoutFragment } from '../fragments/objects/layoutFragment';
import { customDevFragment } from '../fragments/customDevFragment';

export const pageUrlsQuery = groq`*[
  _type == "page"  && hideFromNav != true
]
{
  ${pageUrlFragment}
}`;

export const pagesQuery = groq`*[
  _type == "page"
  && defined(slug.current)
]
  |order(publishedAt desc)
  [0...12]
{
  ${pageMiniFragment}
}`;

export const pageQuery = (includedSections: string[]) => groq`
  *[_type == "page" && _id==$id][0]{
    title,
    sections[]{
      ${getSections(includedSections)},
      _type == "columnLayout" => {
                                      _type,
                                      alignment,
                                      layout{
                                        ${layoutFragment}
                                      },
                                      columns[]{
                                        width,
                                        gap,
                                        sections[]{
                                          ${getSections(includedSections)},
                                        }
                                      }
                              },
      _type == "reference" => {
      ${customDevFragment}
    }
    },
    pageMeta{
      ${pageMetaFragment}
    },
    layout{
      ${layoutFragment}
    },
    parent->{
      ${pageMiniFragment}
    }
  }
  `;

export const pagePreQuery = groq`*[
  _type == "page"
  && _id==$id
][0]
{
  ${pageMiniFragment}
}`;
