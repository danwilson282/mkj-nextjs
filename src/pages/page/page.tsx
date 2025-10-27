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
  sections?: SanitySection[];
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
  const colour = {
    background: {
      colour: {
        alpha: 1,
        hex: '#ffffff',
      },
    },
    text: {
      colour: {
        alpha: 1,
        hex: '#000000',
      },
    },
  };
  return (
    <HeroUIProvider>
      <div
        className="flex flex-col"
        style={{
          backgroundColor: colour.background.colour.hex,
          color: colour.text.colour.hex,
        }}
      >
        <div>
          <div className="container mx-auto w-full">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs?.items} />}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {title}
            </h2>
          </div>

          <Style styleProps={layout}>
            <div>
              {sections?.map((section, key) => (
                <Style key={key} nested styleProps={section.layout}>
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
