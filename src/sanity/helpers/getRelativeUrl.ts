import { groq } from 'next-sanity';
import { loadQuery } from '../lib/loadQuery';
import { SanityPageMeta } from '../types/objects/PageMeta';
import { SanityPage } from '../types/Page';

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

export interface InternalLinkMarkDef {
  _type: 'link';
  linkType: 'internal';
  internalLink: { _ref: string };
  internalUrl?: string;
  [key: string]: unknown;
}

// Define the relative URL resolver (you already have this)

export async function enrichInternalLinks(
  doc: SanityPage
): Promise<SanityPage> {
  async function processNode<T>(node: T): Promise<T> {
    if (Array.isArray(node)) {
      const processed = await Promise.all(node.map(processNode));
      return processed as T;
    }

    if (isRecord(node)) {
      // 🔗 If this node is an internal link markDef
      if (isInternalLinkMarkDef(node)) {
        const internalUrl = await getRelativeUrlFromId(node.internalLink._ref);
        return { ...node, internalUrl } as T;
      }

      // 🧩 Recursively process nested objects
      const entries = await Promise.all(
        Object.entries(node).map(async ([key, value]) => [
          key,
          await processNode(value),
        ])
      );

      return Object.fromEntries(entries) as T;
    }

    // Return primitives as-is
    return node;
  }

  return await processNode(doc);
}

/**
 * ✅ Type guard: checks if value is a record (non-null object)
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * ✅ Type guard: checks if a node is an InternalLinkMarkDef
 */
function isInternalLinkMarkDef(node: unknown): node is InternalLinkMarkDef {
  if (!isRecord(node)) return false;
  if (node._type !== 'link' || node.linkType !== 'internal') return false;

  const internalLink = node.internalLink;
  return isRecord(internalLink) && typeof internalLink._ref === 'string';
}
