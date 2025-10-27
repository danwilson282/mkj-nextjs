import { SanityColumnSection } from '@/sanity/types/sections/ColumnSection';
import { cn } from '@/sanity/helpers/className';
import { Section } from '@/sections';
import { vercelStegaClean } from '@vercel/stega';
import Style from '@/components/Style';
type SectionProps = {
  section: SanityColumnSection;
};

export const ColumnSection: React.FC<SectionProps> = ({ section }) => {
  type ColumnWidth = SanityColumnSection['columns'][number]['width'];
  type ColumnGap = SanityColumnSection['columns'][number]['gap'];
  const alignment = () => {
    switch (vercelStegaClean(section.alignment)) {
      case 'top':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'bottom':
        return 'items-end';
      case 'stretch':
        return 'items-stretch';
      default:
        return '';
    }
  };
  const width = (width: ColumnWidth) => {
    switch (vercelStegaClean(width)) {
      case 'full':
        return 'w-full';
      case 'three-quarters':
        return 'w-3/4';
      case 'two-thirds':
        return 'w-2/3';
      case 'half':
        return 'w-1/2';
      case 'third':
        return 'w-1/3';
      case 'quarter':
        return 'w-1/4';
      default:
        return 'w-full';
    }
  };
  const gap = (gap: ColumnGap) => {
    switch (vercelStegaClean(gap)) {
      case 'large':
        return 'gap-8';
      case 'medium':
        return 'gap-4';
      case 'small':
        return 'gap-2';
      case 'none':
      default:
        return 'gap-0';
    }
  };
  return (
    <div className={cn('flex flex-wrap flex-row w-full', alignment())}>
      {section.columns.map((column, key) => (
        <div
          key={key}
          className={cn('flex flex-col', width(column.width), gap(column.gap))}
        >
          {column.sections.map((section, key) => (
            <Style key={key} nested styleProps={section.layout}>
              <Section key={key} section={section} />
            </Style>
          ))}
        </div>
      ))}
    </div>
  );
};
