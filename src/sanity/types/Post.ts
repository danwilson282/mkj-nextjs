import type { SanitySlug } from "./Slug";
import { SanityDocument } from 'next-sanity';
import { PortableTextBlock } from '@portabletext/types';
import type { Image } from 'sanity';
export type SanityPost = SanityDocument & {
    title: string;
    slug: SanitySlug;
    body: PortableTextBlock[];
    image: Image;
}