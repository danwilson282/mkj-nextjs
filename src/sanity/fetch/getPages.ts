import { loadQuery } from "../lib/loadQuery";
import { pagePreQuery, pagesQuery } from "../queries/page";
import { Page } from "../types/Page";
import { getSections } from "../helpers/getSectionsQuery";
import { groq } from "next-sanity";

export const getPages = async (isDraft: boolean): Promise<Page[] | null> => {
    const data = await loadQuery<Record<string, unknown>, Page[]>(pagesQuery, isDraft, {})
    return data
}

export const getPage = async (
  isDraft: boolean,
  params: Record<string, unknown>
): Promise<Page | null> => {
  const preFetch = await loadQuery<typeof params, Page>(pagePreQuery, isDraft, params);
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
  const page = await loadQuery<typeof params, Page>(pageQuery, isDraft, params);
  // full query
  return page
};