import { groq } from 'next-sanity';
import { loadQuery } from '../lib/loadQuery';
import { SanityPageMeta } from '../types/objects/PageMeta';
import { SanityTextBlockSection } from '../types/sections/TextBlock';

type SlugPart = {
  parent?: string;
  slug: string;
  _id?: string;
  _type?: 'page' | 'post' | 'form';
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
  // Normalize and split URL path, but handle homepage `/`
  const normalizedUrl = url.replace(/^\/+|\/+$/g, '');
  const isHomepage = normalizedUrl === '';
  const segments = isHomepage ? [] : normalizedUrl.split('/');

  let parentId: string | undefined = undefined;
  let currentPage: SlugPart | null = null;

  // Special case for homepage
  if (isHomepage) {
    const query: string = groq`
      *[
        slug.current in ["/", ""] && !defined(parent)
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
      {}
    );

    if (!result) return null;

    return {
      _id: result._id,
      _type: result._type,
      requiresLogin: result.requiresLogin,
      pageMeta: result.pageMeta ?? {},
    };
  }

  // For all other pages
  for (const segment of segments) {
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

    if (!result) return null;

    currentPage = result;
    parentId = result._id;
  }

  return {
    _id: currentPage?._id,
    _type: currentPage?._type,
    requiresLogin: currentPage?.requiresLogin,
    pageMeta: currentPage?.pageMeta ?? {},
  };
};

type InternalLink = {
  _type: 'reference';
  _ref: string;
};

type MarkDefBase = {
  _key: string;
  _type: string;
};

type InternalLinkMarkDef = MarkDefBase & {
  _type: 'link';
  linkType: 'internal' | 'external';
  internalLink?: InternalLink;
  internalUrl?: string;
};

type SpanChild = {
  _type: 'span';
  text: string;
  marks?: string[];
};

export type Block = {
  _type: 'block';
  children: SpanChild[];
  markDefs?: (InternalLinkMarkDef | MarkDefBase)[];
};

// 🧠 Type guard for internal link marks
function isInternalLinkMarkDef(
  markDef: unknown
): markDef is InternalLinkMarkDef {
  return (
    typeof markDef === 'object' &&
    markDef !== null &&
    (markDef as InternalLinkMarkDef)._type === 'link' &&
    (markDef as InternalLinkMarkDef).linkType === 'internal'
  );
}

// 🔧 The enrichment function
export async function enrichBlockInternalLinks(
  section: SanityTextBlockSection
): Promise<SanityTextBlockSection> {
  const enrichedContent = await Promise.all(
    section.content.map(async (block) => {
      if (!block.markDefs?.length) return block;

      const enrichedMarkDefs = await Promise.all(
        block.markDefs.map(async (markDef) => {
          if (
            isInternalLinkMarkDef(markDef) &&
            markDef.internalLink?._ref &&
            !markDef.internalUrl
          ) {
            const internalUrl = await getRelativeUrlFromId(
              markDef.internalLink._ref
            );
            return { ...markDef, internalUrl };
          }

          return markDef;
        })
      );

      return { ...block, markDefs: enrichedMarkDefs };
    })
  );

  return { ...section, content: enrichedContent };
}
