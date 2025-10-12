import type { SanitySlug } from "./Slug";
import { SanityDocument } from 'next-sanity';
import { SanitySection } from "./Section";
export type SanityPage = SanityDocument & {
    title: string;
    slug: SanitySlug;
    sections: SanitySection[];
}