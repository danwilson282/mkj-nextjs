import { loadQuery } from "../lib/loadQuery";
import { pagePreQuery, pagesQuery } from "../queries/page";
import { SanityPage } from "../types/Page";
import { getSections } from "../helpers/getSectionsQuery";
import { groq } from "next-sanity";

export const getPages = async (isDraft: boolean): Promise<SanityPage[] | null> => {
    const data = await loadQuery<Record<string, unknown>, SanityPage[]>(pagesQuery, isDraft, {})
    return data
}

export const getPage = async (
  isDraft: boolean,
  params: Record<string, unknown>
): Promise<SanityPage | null> => {
  const preFetch = await loadQuery<typeof params, SanityPage>(pagePreQuery, isDraft, params);
  // pre query to get types of included sections
  const includedSections = preFetch.sections.map(section=> section._type)
  // get included section fragments
  const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    sections[]{
      ${getSections(includedSections)}
    }
  }
  `
  const page = await loadQuery<typeof params, SanityPage>(pageQuery, isDraft, params);
  // full query
  return page
};