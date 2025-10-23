import { FC } from 'react';
import NextImage from 'next/image';
import type { Image } from 'sanity';
import Link from 'next/link';
import { PortableText, PortableTextBlock } from 'next-sanity';
import { urlFor } from '@/sanity/lib/sanityImage';
interface PostClientProps {
  image: Image;
  title: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

const PostClient: FC<PostClientProps> = ({
  title,
  body,
  publishedAt,
  image,
}) => {
  const postImageUrl = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;
  return (
    <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <NextImage
          src={postImageUrl}
          alt={title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="prose">
        <p>Published: {new Date(publishedAt).toLocaleDateString()}</p>
        {Array.isArray(body) && <PortableText value={body} />}
      </div>
    </main>
  );
};

export default PostClient;
