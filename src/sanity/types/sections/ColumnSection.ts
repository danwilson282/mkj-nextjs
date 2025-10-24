import { SanitySection } from '../Section';

type SanityColumn = {
  width:
    | 'half'
    | 'third'
    | 'two-thirds'
    | 'quarter'
    | 'three-quarters'
    | 'full';
  gap: 'none' | 'small' | 'medium' | 'large';
  sections: SanitySection[];
};

export type SanityColumnSection = {
  _type: string;
  alignment: 'top' | 'center' | 'bottom' | 'stretch';
  columns: SanityColumn[];
};
