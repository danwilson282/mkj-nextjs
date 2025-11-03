'use client';
import { FC, JSX } from 'react';
import {
  Breadcrumbs,
  BreadcrumbProps,
} from '@danwilson282/mkj-component-library';
import { SanitySection } from '@/sanity/types/Section';
import { SanityPageMeta } from '@/sanity/types/objects/PageMeta';
import { SanityLayout } from '@/sanity/types/objects/Layout';
import Style from '@/components/Style';
import { HeroUIProvider } from '@heroui/react';
interface PageClientProps {
  title: string;
  sectionComponents?: JSX.Element[] | undefined;
  pageMeta?: SanityPageMeta;
  layout?: SanityLayout;
  breadcrumbs?: BreadcrumbProps;
}

const PageClient: FC<PageClientProps> = ({
  // title,
  sectionComponents,
  layout,
  breadcrumbs,
}) => {
  return (
    <HeroUIProvider>
      <div
        className="flex flex-col"
        // style={{
        //   backgroundColor: colour.background.colour.hex,
        //   color: colour.text.colour.hex,
        // }}
      >
        <div>
          <div className="container mx-auto w-full">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs?.items} />}
            {/* <h2 className="text-2xl font-semibold text-header mb-4">{title}</h2> */}
          </div>

          <Style styleProps={layout}>
            <div>{sectionComponents}</div>
          </Style>
        </div>
      </div>
    </HeroUIProvider>
  );
};

export default PageClient;
