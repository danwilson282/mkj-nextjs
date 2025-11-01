import { FC } from 'react';
import FormClient from './form';
import { notFound } from 'next/navigation';
import { getRelativeUrlFromId } from '@/sanity/helpers/getRelativeUrl';
import { getForm } from '@/sanity/fetch/getForms';
interface FormServerProps {
  id: string;
  isDraft: boolean;
}
const FormServer: FC<FormServerProps> = async ({ id, isDraft }) => {
  const page = await getForm(isDraft, { id });
  const relativeUrl = await getRelativeUrlFromId(id);
  const breadcrumbsItems = relativeUrl.split('/').map((val) => ({
    href: `/${val}`,
    body: val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : 'Home',
  }));
  const breadcrumbs = {
    items: [...breadcrumbsItems],
  };
  if (page) {
    return (
      <FormClient
        title={page.title}
        intro={page.intro}
        fields={page.fields}
        outro={page.outro}
        pageMeta={page.pageMeta}
        layout={page.layout}
        breadcrumbs={breadcrumbs}
        submitText={page.submitText}
        submittedText={page.submittedText}
      />
    );
  } else {
    notFound();
  }
};

export default FormServer;
