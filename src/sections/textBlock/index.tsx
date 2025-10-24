import { SanityTextBlockSection } from '@/sanity/types/sections/TextBlock';
import { TextBlock } from '@danwilson282/mkj-component-library';
type SectionProps = {
  section: SanityTextBlockSection;
};

export const TextBlockSection: React.FC<SectionProps> = ({ section }) => {
  return <TextBlock value={section.content}></TextBlock>;
};
