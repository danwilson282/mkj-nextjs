import { getUrls } from '../fetch/getUrls';
import { SanityPage } from '../types/Page';
import { NestedNavProps } from '@danwilson282/mkj-component-library';

type NavItems = NestedNavProps['navItems'];
type MenuItem = NavItems[number];
export const generateAbsoluteUrls = async (isDraft: boolean) => {
  const pages = await getUrls(isDraft);

  function buildUrl(
    page: SanityPage,
    allPages: SanityPage[] | undefined
  ): string {
    const parent = allPages?.find((p) => p._id === page.parent?._id);
    if (!parent) return `/${page.slug.current}`;
    return `${buildUrl(parent, allPages)}/${page.slug.current}`;
  }
  const pagesWithUrls: SanityPage[] | undefined = pages?.map((p) => ({
    ...p,
    relativeUrl: buildUrl(p, pages),
  }));
  return pagesWithUrls;
};

export function buildPageTree(
  pages: SanityPage[],
  loggedIn: boolean
): NavItems {
  // Lookup map by _id
  const byId: Record<string, SanityPage> = Object.fromEntries(
    pages.map((page) => [page._id, { ...page, children: [] }])
  );

  const roots: SanityPage[] = [];

  for (const page of Object.values(byId)) {
    if (page.parent && byId[page.parent._id]) {
      // Attach to parent
      byId[page.parent._id].children!.push(page);
    } else {
      // No parent → root node
      roots.push(page);
    }
  }

  // Recursive transformation to MenuItem
  const transform = (node: SanityPage): MenuItem => ({
    id: node._id,
    label: node.title,
    locked: node.requiresLogin && !loggedIn,
    link: node.relativeUrl,
    ...(node.children && node.children.length
      ? { children: node.children.map(transform) }
      : {}),
  });

  return roots.map(transform);
}
