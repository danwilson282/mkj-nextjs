import { FC } from 'react';
import { getPost } from '@/sanity/fetch/getPosts';
import PostClient from './post';
import { notFound } from 'next/navigation';
interface PostServerProps {
  id: string;
  isDraft: boolean;
}
const PostServer: FC<PostServerProps> = async ({ id, isDraft }) => {
  const post = await getPost(isDraft, { id });
  if (post) {
    return (
      <PostClient
        title={post?.title ?? ''}
        body={post?.body ?? []}
        publishedAt={post?.publishedAt ?? ''}
        image={post.image}
      />
    );
  } else {
    notFound();
  }
};

export default PostServer;
