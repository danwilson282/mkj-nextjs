import * as FaIcons from 'react-icons/fa';
import { SanityColour } from '../objects/Colour';
import { SanityLink } from '../objects/Link';
export type SanityCtaSection = {
  _type: string;
  link: SanityLink;
  colour: 'primary' | 'secondary';
  variant: 'filled' | 'outlined';
  size: 'sm' | 'md' | 'lg';
};
