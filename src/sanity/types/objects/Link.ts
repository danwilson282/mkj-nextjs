import { SanityPage } from "../Page";

export type SanityLink = {
    internalLink?: SanityPage;
    externalUrl?: string;
    label: string;
    linkType: "internal" | "external"
}