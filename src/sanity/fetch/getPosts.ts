import { loadQuery } from "../lib/loadQuery";
import { postQuery, postsQuery } from "../queries/post";
import { Post } from "../types/Post";
export const getPosts = async (isDraft: boolean): Promise<Post[] | null> => {
    const data = await loadQuery<Record<string, unknown>, Post[]>(postsQuery, isDraft, {})
    return data
}

export const getPost = async (
  isDraft: boolean,
  params: Record<string, unknown>
): Promise<Post | null> => {
  const results = await loadQuery<typeof params, Post>(postQuery, isDraft, params);
  return results
};