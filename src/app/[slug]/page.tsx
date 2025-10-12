import { PortableText } from "next-sanity";

import Link from "next/link";
import { getPost } from "@/sanity/fetch/getPosts";
import { getPage } from "@/sanity/fetch/getPages";
import { getTopNav } from "@/sanity/fetch/getTopNav";
import { notFound } from 'next/navigation';
import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanityImage";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost(false, await params)
  const page = await getTopNav(false)
  // const page = await getPage(false, {slug: "nested"})
  if (page){
    return <pre>{JSON.stringify(page,null,2)}</pre>
  }
  if (!post){
    notFound();
  }
  
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}