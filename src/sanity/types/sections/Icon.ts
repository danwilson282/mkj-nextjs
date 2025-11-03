import * as FaIcons from 'react-icons/fa';
import { SanityColour } from '../objects/Colour';
export type SanityIconSection = {
  _type: string;
  colour?: SanityColour;
  icon: keyof typeof FaIcons;
  size?: number;
};
