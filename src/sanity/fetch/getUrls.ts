import { loadQuery } from '../lib/loadQuery';
import { pageUrlsQuery } from '../queries/page';
import { SanityPage } from '../types/Page';

export const getUrls = async (
  isDraft: boolean
): Promise<SanityPage[] | null> => {
  const results = await loadQuery<Record<string, unknown>, SanityPage[]>(
    pageUrlsQuery,
    isDraft,
    {}
  );
  return results;
};
