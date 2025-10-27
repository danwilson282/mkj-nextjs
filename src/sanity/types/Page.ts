import type { SanitySlug } from './Slug';
import { SanityDocument } from 'next-sanity';
import { SanitySection } from './Section';
import { SanityPageMeta } from './objects/PageMeta';
import { SanityLayout } from './objects/Layout';
export type SanityPage = SanityDocument & {
  title: string;
  slug: SanitySlug;
  sections?: SanitySection[];
  parent?: SanityPage;
  requiresLogin?: boolean;
  hideFromNav?: boolean;
  pageMeta?: SanityPageMeta;
  layout?: SanityLayout;
};
