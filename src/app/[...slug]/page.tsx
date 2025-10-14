import { draftMode } from "next/headers";
import { notFound } from 'next/navigation';
import { getIdFromRelativeUrl } from "@/sanity/helpers/getRelativeUrl";
import PostServer from "@/pages/post";
import PageServer from "@/pages/page";
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const isDraft = (await draftMode()).isEnabled
  const slugParts = await params;
  const absoluteUrl = `/${slugParts.slug.join('/')}`;
  const idFromUrl = await getIdFromRelativeUrl(absoluteUrl)
  // const post = await getPost(false, await params)
  // const page = await getTopNav(false)
  // const page = await getPage(false, {slug: "nested"})
  if (idFromUrl){
    const pageType = idFromUrl._type
    const id = idFromUrl._id
    if (!id){
      notFound();
    }
    switch (pageType){
      case "page":
        return <PageServer isDraft={isDraft} id={id} requiresLogin={idFromUrl.requiresLogin}/>
      case "post":
        return <PostServer isDraft={isDraft} id={id}/>
      default:
        notFound();
    }
  }
  else{
    notFound();
  }

}