"use server"
import { SanityImageSection } from '@/sanity/types/sections/Image';
import { ImageBlockSectionClient } from './Image';
type SectionProps = {
  section: SanityImageSection;
};

export const ImageBlockSection: React.FC<SectionProps> = async ({ section }) => {
  return (
    <ImageBlockSectionClient section={section} />
  );
};
