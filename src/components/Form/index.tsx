// components/Form.tsx
import { FC, useState, FormEvent } from 'react';
import { cn } from '@/sanity/helpers/className';
import { SanityFormField } from '@/sanity/types/FormField';
import FormField from './FormField';
import { Button, Form as HeroForm } from '@heroui/react';

interface FormProps {
  fields: SanityFormField[];
  submitText: string;
  submittedText: string
}

const Form: FC<FormProps> = ({ fields, submitText, submittedText }) => {
  // Explicitly type the submitted data (can be refined later)
  const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null);

  // Type the event properly
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmitted(data);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <HeroForm className="w-full" onSubmit={onSubmit}>
          {fields.map((field, key) => (
            <FormField key={key} field={field} />
          ))}

          <Button type="submit" variant="bordered" color="primary">
            {submitText}
          </Button>

          {submitted && (
            <div className="text-small text-secondary">
             {submittedText}  <code>{JSON.stringify(submitted)}</code>
            </div>
          )}
        </HeroForm>
      </div>
    </div>
  );
};

export default Form;
