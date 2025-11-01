'use client';
import { FC, JSX } from 'react';
import {
  Breadcrumbs,
  BreadcrumbProps,
  TextBlockProps,
  TextBlock,
} from '@danwilson282/mkj-component-library';
import { SanityPageMeta } from '@/sanity/types/objects/PageMeta';
import { SanityLayout } from '@/sanity/types/objects/Layout';
import Style from '@/components/Style';
import { HeroUIProvider } from '@heroui/react';
import { SanityFormField } from '@/sanity/types/FormField';
import Form from '@/components/Form';
interface FormClientProps {
  title: string;
  intro?: TextBlockProps['value']
  fields: SanityFormField[]
  outro?: TextBlockProps['value']
  pageMeta?: SanityPageMeta;
  layout?: SanityLayout;
  breadcrumbs?: BreadcrumbProps;
  submitText: string;
  submittedText: string;
  slug: string
  // submit: (formData: FormData) => Promise<void> | void;
}

const FormClient: FC<FormClientProps> = ({
  title,
  intro,
  fields,
  outro,
  layout,
  breadcrumbs,
  submitText,
  submittedText,
  slug
}) => {
  return (
    <HeroUIProvider>
      <div
        className="flex flex-col"
        // style={{
        //   backgroundColor: colour.background.colour.hex,
        //   color: colour.text.colour.hex,
        // }}
      >
        <div>
          <div className="container mx-auto w-full">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs?.items} />}
            <h2 className="text-2xl font-semibold text-header mb-4">{title}</h2>
          </div>

          <Style styleProps={layout}>
            <div className="flex flex-col min-w-1/2">
                {intro && <div className="pb-2"><TextBlock value={intro} /></div>}
              <Form fields={fields} submitText={submitText} submittedText={submittedText} slug={slug}/>
                {outro && <div className="pt-2 pb-2"><TextBlock value={outro} /></div>}
            </div>
          </Style>
        </div>
      </div>
    </HeroUIProvider>
  );
};

export default FormClient;
