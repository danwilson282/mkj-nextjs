import { loadQuery } from '../lib/loadQuery';
import { pagePreQuery, pagesQuery, pageQuery } from '../queries/page';
import { SanityPage } from '../types/Page';
import { SanityColumnSection } from '../types/sections/ColumnSection';

export const getPages = async (
  isDraft: boolean
): Promise<SanityPage[] | null> => {
  const data = await loadQuery<Record<string, unknown>, SanityPage[]>(
    pagesQuery,
    isDraft,
    {}
  );
  return data;
};

// export const getPageSlug = async (
//   isDraft: boolean,
//   params: Record<string, unknown>
// ): Promise<SanityPage | null> => {
//   const preFetch = await loadQuery<typeof params, SanityPage>(pagePreQuery, isDraft, params);
//   // pre query to get types of included sections
//   const includedSections = preFetch.sections.map(section=> section._type)
//   const page = await loadQuery<typeof params, SanityPage>(pageQuery(includedSections), isDraft, params);
//   // full query
//   return page
// };

export const getPage = async (
  isDraft: boolean,
  params: Record<string, unknown>
): Promise<SanityPage | null> => {
  const preFetch = await loadQuery<typeof params, SanityPage>(
    pagePreQuery,
    isDraft,
    params
  );
  // pre query to get types of included sections
  //get array of section names from either column structure or normal sections
  const topLevelSections = preFetch.sections.map((section) => section._type);
  const nestedColumnSections = preFetch.sections
    .filter((section) => section._type === 'columnLayout')
    .flatMap((section) => {
      const s = section as SanityColumnSection;
      return s.columns.flatMap((column) =>
        column.sections.map((sec) => sec._type)
      );
    });
  // remove section type columnLayout, join together and create unique set
  const includedSections = [
    ...new Set([
      ...topLevelSections.filter((val) => val != 'columnLayout'),
      ...nestedColumnSections,
    ]),
  ];
  const page = await loadQuery<typeof params, SanityPage>(
    pageQuery(includedSections),
    isDraft,
    params
  );
  // if page includes column structure map over columns and populate data

  // full query
  return page;
};
