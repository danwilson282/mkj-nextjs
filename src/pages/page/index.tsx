import { FC } from 'react';
import { getPage } from '@/sanity/fetch/getPages';
import PageClient from './page';
import { notFound } from 'next/navigation';
import { getRelativeUrlFromId } from '@/sanity/helpers/getRelativeUrl';
import Style from '@/components/Style';
import { ColumnSection } from '@/sections/column';
import { SanityColumnSection } from '@/sanity/types/sections/ColumnSection';
import { Section } from '@/sections';
interface PageServerProps {
  id: string;
  isDraft: boolean;
}
const PageServer: FC<PageServerProps> = async ({ id, isDraft }) => {
  const page = await getPage(isDraft, { id });
  const relativeUrl = await getRelativeUrlFromId(id);
  const breadcrumbsItems = relativeUrl.split('/').map((val) => ({
    href: `/${val}`,
    body: val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : 'Home',
  }));
  const breadcrumbs = {
    items: [...breadcrumbsItems],
  };
const sectionComponents = () => (
  page?.sections?.map((section, key) => (
    
    <Style key={key} nested styleProps={section.layout}>
       {section._type === 'columnLayout' && (
         <ColumnSection section={section as SanityColumnSection} />
       )}
       <Section section={section} />
    </Style>
  ))
)
  if (page) {
    return (
      <PageClient
        title={page.title}
        sections={page.sections}
        sectionComponents={sectionComponents()}
        pageMeta={page.pageMeta}
        layout={page.layout}
        breadcrumbs={breadcrumbs}
      />
    );
  } else {
    notFound();
  }
};

export default PageServer;
