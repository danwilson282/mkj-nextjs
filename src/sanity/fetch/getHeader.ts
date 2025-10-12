import { loadQuery } from "../lib/loadQuery";
import { headerQuery } from "../queries/header";
import { SanityHeader } from "../types/globals/Header";

export const getHeader = async (
  isDraft: boolean,
): Promise<SanityHeader | null> => {
  const results = await loadQuery<Record<string, unknown>, SanityHeader>(headerQuery, isDraft, {});
  return results
};