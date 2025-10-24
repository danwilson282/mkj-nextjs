import { SanityHeroSection } from './sections/Hero';
import { SanityTextBlockSection } from './sections/TextBlock';
import { SanityColumnSection } from './sections/ColumnSection';

export type SanitySection =
  | SanityHeroSection
  | SanityTextBlockSection
  | SanityColumnSection;
