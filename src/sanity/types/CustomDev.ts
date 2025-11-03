import { TextBlockProps } from '@danwilson282/mkj-component-library';
import { SanitySlug } from './Slug';

export type SanityCustomDevSection = {
  _type: string;
  customDev: {
    title: string;
    slug: string;
    information?: TextBlockProps['value'];
  };
};
