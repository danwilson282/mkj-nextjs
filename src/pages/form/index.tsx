import { FC } from 'react';
import FormClient from './form';
import { notFound } from 'next/navigation';
import { getRelativeUrlFromId } from '@/sanity/helpers/getRelativeUrl';
import { getForm } from '@/sanity/fetch/getForms';
import { formActions } from '../../actions/formActions';
interface FormServerProps {
  id: string;
  isDraft: boolean;
}
const FormServer: FC<FormServerProps> = async ({ id, isDraft }) => {
  const form = await getForm(isDraft, { id });
  const relativeUrl = await getRelativeUrlFromId(id);
  const breadcrumbsItems = relativeUrl.split('/').map((val) => ({
    href: `/${val}`,
    body: val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : 'Home',
  }));
  const breadcrumbs = {
    items: [...breadcrumbsItems],
  };
  
  if (form) {
    return (
      <FormClient
        title={form.title}
        intro={form.intro}
        fields={form.fields}
        outro={form.outro}
        pageMeta={form.pageMeta}
        layout={form.layout}
        breadcrumbs={breadcrumbs}
        submitText={form.submitText}
        submittedText={form.submittedText}
        slug={form.slug.current}
      />
    );
  } else {
    notFound();
  }
};

export default FormServer;
