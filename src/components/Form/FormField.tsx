import { FC } from 'react';
import { cn } from '@/sanity/helpers/className';
import { SanityFormField } from '@/sanity/types/FormField';
import { Input, Select, SelectItem, Textarea } from '@heroui/react';
import { fi } from '@faker-js/faker';
interface FormFieldProps {
  field: SanityFormField;
}
const FormField: FC<FormFieldProps> = ({ field }) => {
  const fieldType = field.type || 'text';
  switch (fieldType) {
    case 'textarea':
      return (
        <Textarea
          isRequired={field.required}
          label={field.label}
          labelPlacement="inside"
          placeholder={field.placeholder}
          variant="bordered"
          color="secondary"
        />
      );
    case 'select':
      const options =
        field.options?.map((option) => ({ key: option, label: option })) ?? [];
      return (
        <Select
          isRequired={field.required}
          label={field.label}
          placeholder={field.placeholder}
          variant="bordered"
          color="secondary"
        >
          {options.map((option) => (
            <SelectItem className="text-primary" key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      );
    case 'email':
    case 'password':
    case 'text':
    case 'number':
    default:
      return (
        <Input
          isRequired={field.required}
          name={field.name}
          defaultValue={''}
          label={field.label}
          type={fieldType}
          placeholder={field.placeholder}
          variant="bordered"
          color="secondary"
        />
      );
  }
};

export default FormField;
