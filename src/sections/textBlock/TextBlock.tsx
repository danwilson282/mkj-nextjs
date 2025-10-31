"use client"
import { SanityTextBlockSection } from '@/sanity/types/sections/TextBlock';
import { TextBlock } from '@danwilson282/mkj-component-library';
import React from 'react';
type SectionProps = {
  section: SanityTextBlockSection;
};

export const TextBlockSectionClient: React.FC<SectionProps> = ({ section }) => {
  return <TextBlock value={section.content} />;
};
