'use server';
import { SanityTextBlockSection } from '@/sanity/types/sections/TextBlock';
import React from 'react';
import { TextBlockSectionClient } from './TextBlock';
import { enrichBlockInternalLinks } from '@/sanity/helpers/getRelativeUrl';
type SectionProps = {
  section: SanityTextBlockSection;
};

export const TextBlockSection: React.FC<SectionProps> = async ({ section }) => {
  const sectionWithLinks = await enrichBlockInternalLinks(section);
  return <TextBlockSectionClient section={sectionWithLinks} />;
};
