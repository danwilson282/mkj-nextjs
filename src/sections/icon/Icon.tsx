"use client"
import { SanityIconSection } from '@/sanity/types/sections/Icon';
import { Icon } from '@danwilson282/mkj-component-library';
import React from 'react';
type SectionProps = {
  section: SanityIconSection;
};

export const IconSectionClient: React.FC<SectionProps> = ({ section }) => {
  return <Icon icon={section.icon} color={section.colour?.hex ?? "#000000"} size={section.size ?? 20} />;
};
