'use client';
import { SanityHeroSection } from '@/sanity/types/sections/Hero';
import { HeroBanner } from '@danwilson282/mkj-component-library';
type SectionProps = {
  section: SanityHeroSection;
};

export const HeroSectionClient: React.FC<SectionProps> = ({ section }) => {
  return (
    <HeroBanner
      title={section.heading}
      body={section.tagline}
      image={{
        src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        alt: 'AltText',
      }}
      button={{ label: 'dd', colour: 'primary', size: 'lg' }}
    ></HeroBanner>
  );
};
