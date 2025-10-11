import type { Slug } from "./Slug";
import { SanityDocument } from 'next-sanity';
import { PortableTextBlock } from '@portabletext/types';
import type { Image } from 'sanity';
export type Post = SanityDocument & {
    title: string;
    slug: Slug;
    body: PortableTextBlock[];
    image: Image;
}