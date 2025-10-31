"use server"
import { SanityHeroSection } from '@/sanity/types/sections/Hero';
import { HeroSectionClient } from './Hero';
type SectionProps = {
  section: SanityHeroSection;
};

export const HeroSection: React.FC<SectionProps> = async ({ section }) => {
  return (
    <HeroSectionClient section={section} />
  );
};
