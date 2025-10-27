import { SanityHeroSection } from './sections/Hero';
import { SanityTextBlockSection } from './sections/TextBlock';
import { SanityColumnSection } from './sections/ColumnSection';
import { SanityLayout } from './objects/Layout';
import { SanityImageSection } from './sections/Image';

export type SanitySection = SanitySections & {
  layout?: SanityLayout;
};

type SanitySections =
  | SanityHeroSection
  | SanityTextBlockSection
  | SanityColumnSection
  | SanityImageSection;
