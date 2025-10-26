import { FC } from 'react';
import { getPage } from '@/sanity/fetch/getPages';
import PageClient from './page';
import { notFound } from 'next/navigation';
import { getRelativeUrlFromId } from '@/sanity/helpers/getRelativeUrl';
interface PageServerProps {
  id: string;
  isDraft: boolean;
}
const PageServer: FC<PageServerProps> = async ({
  id,
  isDraft,
}) => {
  const page = await getPage(isDraft, { id });
  const relativeUrl = await getRelativeUrlFromId(id);
  const breadcrumbsItems = relativeUrl.split('/').map((val) => ({
    href: `/${val}`,
    body: val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : 'Home',
  }));
  const breadcrumbs = {
    items: [...breadcrumbsItems],
  };
  if (page) {
    return (
      <PageClient
        title={page.title}
        sections={page.sections}
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
