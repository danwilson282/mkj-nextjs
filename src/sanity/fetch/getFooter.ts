import { loadQuery } from "../lib/loadQuery";
import { footerQuery } from "../queries/footer";
import { SanityFooter } from "../types/globals/Footer";

export const getFooter = async (
  isDraft: boolean,
): Promise<SanityFooter | null> => {
  const results = await loadQuery<Record<string, unknown>, SanityFooter>(footerQuery, isDraft, {});
  return results
};