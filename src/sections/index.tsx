import { SanitySection } from '@/sanity/types/Section';
import { HeroSection } from './hero';
import { SanityHeroSection } from '@/sanity/types/sections/Hero';
import { TextBlockSection } from './textBlock';
import { SanityTextBlockSection } from '@/sanity/types/sections/TextBlock';
import { ImageBlockSection } from './image';
import { SanityImageSection } from '@/sanity/types/sections/Image';
import { SanityIconSection } from '@/sanity/types/sections/Icon';
import { IconSection } from './icon';
import { CtaSection } from './cta';
import { SanityCtaSection } from '@/sanity/types/sections/Cta';
type SectionProps = {
  section: SanitySection;
};

export const Section: React.FC<SectionProps> = ({ section }) => {
  switch (section._type) {
    case 'hero':
      return <HeroSection section={section as SanityHeroSection} />;
    case 'textBlock':
      return <TextBlockSection section={section as SanityTextBlockSection} />;
    case 'imageBlock':
      return <ImageBlockSection section={section as SanityImageSection} />;
    case 'icon':
      return <IconSection section={section as SanityIconSection} />;
    case 'cta':
      return <CtaSection section={section as SanityCtaSection} />;
    default:
      return <></>;
  }
};
