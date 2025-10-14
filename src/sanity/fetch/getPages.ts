import { loadQuery } from "../lib/loadQuery";
import { pagePreQuery, pagesQuery, pageQuery } from "../queries/page";
import { SanityPage } from "../types/Page";

export const getPages = async (isDraft: boolean): Promise<SanityPage[] | null> => {
    const data = await loadQuery<Record<string, unknown>, SanityPage[]>(pagesQuery, isDraft, {})
    return data
}

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
  const preFetch = await loadQuery<typeof params, SanityPage>(pagePreQuery, isDraft, params);
  // pre query to get types of included sections
  const includedSections = preFetch.sections.map(section=> section._type)
  const page = await loadQuery<typeof params, SanityPage>(pageQuery(includedSections), isDraft, params);
  // full query
  return page
};