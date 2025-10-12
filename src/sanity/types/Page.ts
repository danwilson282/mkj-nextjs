import type { Slug } from "./Slug";
import { SanityDocument } from 'next-sanity';
import { SanitySection } from "./Section";
export type Page = SanityDocument & {
    title: string;
    slug: Slug;
    sections: SanitySection[];
}