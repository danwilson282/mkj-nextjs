'use client';
import { FC } from 'react';
import {
  Breadcrumbs,
  BreadcrumbProps,
} from '@danwilson282/mkj-component-library';
import { SanitySection } from '@/sanity/types/Section';
import { SanityPageMeta } from '@/sanity/types/objects/PageMeta';
import { SanityLayout } from '@/sanity/types/objects/Layout';
import Style from '@/components/Style';
import { HeroUIProvider } from '@heroui/react';
import { Section } from '@/sections';
import { ColumnSection } from '@/sections/column';
import { SanityColumnSection } from '@/sanity/types/sections/ColumnSection';
interface PageClientProps {
  title: string;
  sections: SanitySection[];
  pageMeta?: SanityPageMeta;
  layout?: SanityLayout;
  breadcrumbs?: BreadcrumbProps;
}

const PageClient: FC<PageClientProps> = ({
  title,
  sections,
  pageMeta,
  layout,
  breadcrumbs,
}) => {
  //flex flex-col (for masthead)
  //masthead div
  //colour and font
  //container
  //default responsive padding
  //additional padding
  //flex justify and align
  //page
  const style: SanityLayout = {
    alignment: 'end',
    backgroundColor: {
      colour: {
        alpha: 1,
        hex: '#7be311',
      },
      opacity: 1,
    },
    justification: 'justify-end',
    padding: {
      bottom: '0.5rem',
      left: '2rem',
      right: '0.5rem',
      top: '0.5rem',
    },
  };
  const colour = {
    background: {
      colour: {
        alpha: 1,
        hex: '#742222',
      },
    },
    text: {
      colour: {
        alpha: 1,
        hex: '#123456',
      },
    },
  };
  return (
    <HeroUIProvider>
      <div className="flex flex-col">
        <div>
          <Style styleProps={layout}>
            {breadcrumbs && <Breadcrumbs items={breadcrumbs?.items} />}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {title}
            </h2>
            <div>
              {sections.map((section, key) => (
                <Style key={key}>
                  {section._type == 'columnLayout' && (
                    <ColumnSection section={section as SanityColumnSection} />
                  )}
                  <Section section={section} />
                </Style>
              ))}
            </div>
          </Style>
        </div>
      </div>
    </HeroUIProvider>
  );
};

export default PageClient;
