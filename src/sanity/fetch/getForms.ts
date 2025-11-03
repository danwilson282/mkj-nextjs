import { loadQuery } from '../lib/loadQuery';
import { formQuery, formsQuery } from '../queries/form';
import { SanityForm } from '../types/Form';
import { SanityPage } from '../types/Page';
export const getForms = async (
  isDraft: boolean
): Promise<SanityForm[] | null> => {
  const data = await loadQuery<Record<string, unknown>, SanityForm[]>(
    formsQuery,
    isDraft,
    {}
  );
  return data;
};

export const getForm = async (
  isDraft: boolean,
  params: Record<string, unknown>
): Promise<SanityForm | null> => {
  const form = await loadQuery<typeof params, SanityForm>(
    formQuery,
    isDraft,
    params
  );

  return form;
};
