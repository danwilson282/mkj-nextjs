// components/Form.tsx
"use client"
import { FC, useState, FormEvent} from 'react';
import { cn } from '@/sanity/helpers/className';
import { SanityFormField } from '@/sanity/types/FormField';
import FormField from './FormField';
import { Button, Form as HeroForm } from '@heroui/react';
import { register, fallback } from '@/actions/formActions';
interface FormProps {
  fields: SanityFormField[];
  submitText: string;
  submittedText: string;
  slug: string;
//   submit: (formData: FormData) => Promise<void> | void;
}

const Form: FC<FormProps> = ({ fields, submitText, submittedText, slug }) => {
  // Explicitly type the submitted data (can be refined later)
  const [submitted, setSubmitted] = useState(false)
    //Show submit message
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
  };
  // Select server action based on slug
    const serverAction = () => {
        switch (slug){
            case "register":
                return register
            default:
                return fallback
        }
    }
  return (
    <div>
      <div className="flex flex-col gap-4">
        <HeroForm className="w-full" onSubmit={onSubmit} action={serverAction()}>
          {fields.map((field, key) => (
            <FormField key={key} field={field} />
          ))}

          <Button type="submit" variant="bordered" color="primary">
            {submitText}
          </Button>

          {submitted && (
            <div className="text-small text-secondary">
             {submittedText}
            </div>
          )}
        </HeroForm>
      </div>
    </div>
  );
};

export default Form;
