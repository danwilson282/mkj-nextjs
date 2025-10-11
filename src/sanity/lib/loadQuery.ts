import { client } from "./client";
export type LoadQueryOptionsType = {
    next: {
        revalidate: number;
    },
    perspective: "drafts" | "published";
    useCdn: boolean;
    stega: boolean;
}

// Add ResultType generic
export const loadQuery = async <
  Params extends Record<string, unknown>,
  ResultType
>(
  query: string,
  isDraft: boolean,
  params: Params
): Promise<ResultType> => {
  const options: LoadQueryOptionsType = {
    next: { revalidate: 30 },
    perspective: isDraft ? "drafts" : "published",
    useCdn: true,
    stega: isDraft,
  };

  const data = await client.fetch<ResultType>(query, params, options);
  return data;
};