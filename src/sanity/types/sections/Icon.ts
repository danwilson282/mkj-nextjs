import * as FaIcons from 'react-icons/fa';
export type SanityIconSection = {
  _type: string;
  color: string;
  icon: keyof typeof FaIcons;
  size: number
};
