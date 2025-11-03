'use server';
import { SanityIconSection } from '@/sanity/types/sections/Icon';
import { IconSectionClient } from './Icon';
type SectionProps = {
  section: SanityIconSection;
};

export const IconSection: React.FC<SectionProps> = async ({ section }) => {
  return <IconSectionClient section={section} />;
};
