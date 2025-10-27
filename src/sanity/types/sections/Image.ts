import type { SanityImageAssetDocument } from 'next-sanity';

export type SanityImageSection = {
  _type: string;
  title: string;
  image: SanityImageAssetDocument;
  height?: number;
  width?: number;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  zoom?: boolean;
};
