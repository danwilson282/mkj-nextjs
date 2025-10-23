import type { Image } from 'sanity';
export type SanityPageMeta = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  metaKeywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  openGraphImage?: Image;
  openGraphTitle?: string;
  openGraphDescription?: string;
};
