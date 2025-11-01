"use server"
import { SanityCtaSection } from "@/sanity/types/sections/Cta";
import { CtaSectionClient } from "./Cta";
import { getRelativeUrlFromId } from "@/sanity/helpers/getRelativeUrl";
type SectionProps = {
  section: SanityCtaSection;
};

export const CtaSection: React.FC<SectionProps> = async ({ section }) => {
    const href = async () => {
    if (section.link.linkType === 'external' && section.link.externalUrl) {
      return section.link.externalUrl;
    }
    if (section.link.linkType === 'internal' && section.link.internalLink?._id) {
      const link = await getRelativeUrlFromId(section.link.internalLink?._id)
      return link
    }
    return '/'
  }
  // const href = resolveSanityLink(value.link);
  const target = section.link.linkType === 'external' ? '_blank' : '_self';
  return (
    <CtaSectionClient section={section} target={target} href={await href()}/>
  );
};
