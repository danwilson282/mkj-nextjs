import { SanityDocument } from 'next-sanity';
export type SanityFormField = SanityDocument & {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required?: boolean;
  options?: string[]; // For select fields
  placeholder?: string;
};