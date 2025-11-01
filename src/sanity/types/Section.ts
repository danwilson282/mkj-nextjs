import { SanityHeroSection } from './sections/Hero';
import { SanityTextBlockSection } from './sections/TextBlock';
import { SanityColumnSection } from './sections/ColumnSection';
import { SanityLayout } from './objects/Layout';
import { SanityImageSection } from './sections/Image';
import { SanityIconSection } from './sections/Icon';
import { SanityCtaSection } from './sections/Cta';
export type SanitySection = SanitySections & {
  layout?: SanityLayout;
};

type SanitySections =
  | SanityHeroSection
  | SanityTextBlockSection
  | SanityColumnSection
  | SanityImageSection
  | SanityIconSection
  | SanityCtaSection;
