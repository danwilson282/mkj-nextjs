import { SanityColour } from "../objects/Colour";
import type { Image } from 'sanity';
export type SanityHeader = {
    siteTitle?: string;
    backgroundColour?: SanityColour;
    logo?: string;
}