import type { SanitySlug } from './Slug';
import { SanityDocument } from 'next-sanity';
import { SanityPageMeta } from './objects/PageMeta';
import { SanityLayout } from './objects/Layout';
import { SanityFormField } from './FormField';
import { TextBlockProps } from '@danwilson282/mkj-component-library';
export type SanityForm = SanityDocument & {
  title: string;
  slug: SanitySlug;
  intro?: TextBlockProps['value'];
  fields: SanityFormField[];
  submitText: string;
  submittedText: string;
  outro?: TextBlockProps['value'];
  requiresLogin?: boolean;
  hideFromNav?: boolean;
  pageMeta?: SanityPageMeta;
  layout?: SanityLayout;
};
