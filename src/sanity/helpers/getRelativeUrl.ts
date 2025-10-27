import { groq } from 'next-sanity';
import { loadQuery } from '../lib/loadQuery';
import { SanityPageMeta } from '../types/objects/PageMeta';

type SlugPart = {
  parent?: string;
  slug: string;
  _id?: string;
  _type?: 'page' | 'post';
  requiresLogin?: boolean;
  pageMeta?: SanityPageMeta;
};

export const getRelativeUrlFromId = async (id: string): Promise<string> => {
  const query = groq`
    *[_id == "${id}"][0] {
      "parent": parent._ref,
      "slug": slug.current
    }
  `;

  const result = await loadQuery<Record<string, unknown>, SlugPart>(
    query,
    false,
    {}
  );

  if (!result?.slug) {
    return '/';
  }

  // If the page has a parent, recursively get its URL
  const parentPath = result.parent
    ? await getRelativeUrlFromId(result.parent)
    : '';

  // Join parent path and current slug
  return `${parentPath}/${result.slug}`.replace(/\/+/g, '/');
};

export const getPageDataFromRelativeUrl = async (
  url: string
): Promise<Partial<SlugPart> | null> => {
  // Normalize and split URL path
  const segments = url.replace(/^\/+|\/+$/g, '').split('/');

  let parentId: string | undefined = undefined;
  let currentPage: SlugPart | null = null;

  for (const segment of segments) {
    // GROQ query to find a document by slug and optional parent
    const query: string = groq`
      *[
        slug.current == $slug &&
        ${parentId ? 'parent._ref == $parentId' : '!defined(parent)'}
      ][0] {
        _id,
        _type,
        requiresLogin,
        hideFromNav,
        pageMeta,
        "slug": slug.current,
        "parent": parent._ref
      }
    `;

    const result: SlugPart = await loadQuery<Record<string, unknown>, SlugPart>(
      query,
      false,
      { slug: segment, parentId }
    );

    if (!result) return null; // Segment not found

    currentPage = result;
    parentId = result._id; // Set parent for next iteration
  }

  return {
    _id: currentPage?._id,
    _type: currentPage?._type,
    requiresLogin: currentPage?.requiresLogin,
    pageMeta: currentPage?.pageMeta ?? {},
  };
};
