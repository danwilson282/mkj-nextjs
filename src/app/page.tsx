import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPageDataFromRelativeUrl } from '@/sanity/helpers/getRelativeUrl';
import PageServer from '@/pages/page';
export async function generateMetadata() {
  const absoluteUrl = ``;
  const pageObject = await getPageDataFromRelativeUrl(absoluteUrl);
  return {
    title:
      pageObject?.pageMeta?.metaTitle ?? process.env.NEXT_PUBLIC_META_TITLE,
    description:
      pageObject?.pageMeta?.metaDescription ??
      process.env.NEXT_PUBLIC_META_DESCRIPTION,
    keywords: pageObject?.pageMeta?.metaKeywords ?? [],
    alternates: {
      canonical: pageObject?.pageMeta?.canonicalUrl,
    },
    openGraph: {
      title:
        pageObject?.pageMeta?.openGraphTitle ??
        process.env.NEXT_PUBLIC_META_TITLE,
      description:
        pageObject?.pageMeta?.openGraphDescription ??
        process.env.NEXT_PUBLIC_META_DESCRIPTION,
    },
    robots: {
      index: !(pageObject?.pageMeta?.noIndex || pageObject?.requiresLogin),
      follow: !(pageObject?.pageMeta?.noFollow || pageObject?.requiresLogin),
    },
  };
}

export default async function PostPage() {
  const isDraft = (await draftMode()).isEnabled;
  const idFromUrl = await getPageDataFromRelativeUrl('');
  // return (<pre>{JSON.stringify(idFromUrl)}</pre>)
  if (idFromUrl) {
    const id = idFromUrl._id;
    if (!id) {
      notFound();
    }
    return <PageServer isDraft={isDraft} id={id} />;
  } else {
    notFound();
  }
}
