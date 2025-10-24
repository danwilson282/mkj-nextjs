import { loadQuery } from '../lib/loadQuery';
import { postQuery, postsQuery } from '../queries/post';
import { SanityPost } from '../types/Post';
export const getPosts = async (
  isDraft: boolean
): Promise<SanityPost[] | null> => {
  const data = await loadQuery<Record<string, unknown>, SanityPost[]>(
    postsQuery,
    isDraft,
    {}
  );
  return data;
};

export const getPost = async (
  isDraft: boolean,
  params: Record<string, unknown>
): Promise<SanityPost | null> => {
  const results = await loadQuery<typeof params, SanityPost>(
    postQuery,
    isDraft,
    params
  );
  return results;
};
