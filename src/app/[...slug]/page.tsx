import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPageDataFromRelativeUrl } from '@/sanity/helpers/getRelativeUrl';
import PostServer from '@/pages/post';
import PageServer from '@/pages/page';
import { Metadata } from 'next';
import { auth } from '@/lib/auth/auth';
import { Session } from 'next-auth';
import ErrorPage from '@/pages/error';
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slugParts = await params;
  const absoluteUrl = `/${slugParts.slug.join('/')}`;
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
      index: !pageObject?.pageMeta?.noIndex,
      follow: !pageObject?.pageMeta?.noFollow,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const isDraft = (await draftMode()).isEnabled;
  const slugParts = await params;
  const absoluteUrl = `/${slugParts.slug.join('/')}`;
  const idFromUrl = await getPageDataFromRelativeUrl(absoluteUrl);
  const session = (await auth()) as Session;  
  if (idFromUrl) {
    const pageType = idFromUrl._type;
    const id = idFromUrl._id;
    if (!id) {
      notFound();
    }
    if (idFromUrl.requiresLogin && !session){
      return <ErrorPage>You need to be logged in to view this page.</ErrorPage>;
    }
    switch (pageType) {
      case 'page':
        return (
          <PageServer
            isDraft={isDraft}
            id={id}
          />
        );
      case 'post':
        return <PostServer isDraft={isDraft} id={id} />;
      default:
        notFound();
    }
  } else {
    notFound();
  }
}
