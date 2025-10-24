import { loadQuery } from '../lib/loadQuery';
import { navigationQuery } from '../queries/navigation';
import { SanityTopNav } from '../types/globals/TopNav';

export const getTopNav = async (
  isDraft: boolean
): Promise<SanityTopNav | null> => {
  const results = await loadQuery<Record<string, unknown>, SanityTopNav>(
    navigationQuery,
    isDraft,
    {}
  );
  return results;
};
