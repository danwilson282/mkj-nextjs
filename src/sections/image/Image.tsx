"use client"
import { SanityImageSection } from '@/sanity/types/sections/Image';
import { Image } from '@heroui/react';
import NextImage from 'next/image';
type SectionProps = {
  section: SanityImageSection;
};

export const ImageBlockSectionClient: React.FC<SectionProps> = ({ section }) => {
  const aspect = section.image.metadata.dimensions.aspectRatio;
  const dimensions = () => {
    if (section.width && section.height) {
      return {
        width: section.width,
        height: section.height,
      };
    }

    if (section.width && !section.height) {
      return {
        width: section.width,
        height: section.width / aspect,
      };
    }
    if (!section.width && section.height) {
      return {
        width: section.height * aspect,
        height: section.height,
      };
    }
    return {
      width: 300,
      height: 300 / aspect,
    };
  };
  return (
    <Image
      alt={section.title || 'Image'}
      as={NextImage}
      height={dimensions().height}
      src={section.image.url}
      width={dimensions().width}
      radius={section.radius}
      shadow={section.shadow}
      isZoomed={section.zoom}
    />
  );
};
