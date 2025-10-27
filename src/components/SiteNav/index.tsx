'use client';

import { NestedNav, NestedNavProps } from '@danwilson282/mkj-component-library';
import { Session } from 'next-auth';
export type SiteNavProps = {
  nav: NestedNavProps['navItems'];
  session: Session;
};

export const SiteNav: React.FC<SiteNavProps> = ({ nav, session }) => {
  const items = [
    {
      id: '1',
      label: 'Home',
      link: '/',
    },
    {
      children: [
        {
          id: '21',
          label: 'Electronics',
          link: '#electronics',
        },
        {
          id: '22',
          label: 'Clothing',
          link: '#clothing',
        },
        {
          children: [
            {
              id: '231',
              label: 'Furniture',
              link: '#furniture',
            },
            {
              id: '232',
              label: 'Decor',
              link: '#decor',
            },
            {
              id: '233',
              label: 'Garden Tools',
              link: '#garden',
            },
          ],
          id: '23',
          label: 'Home & Garden',
        },
      ],
      id: '2',
      label: 'Dashboard',
      link: '/dashboard',
    },
    {
      children: [
        {
          id: '31',
          label: 'Consulting',
          link: '#consulting',
        },
        {
          id: '32',
          label: 'Support',
          link: '#support',
        },
      ],
      id: '3',
      label: 'Services',
    },
    {
      id: '4',
      label: 'About',
      link: '#about',
    },
    {
      id: '5',
      label: 'Contact',
      link: '#contact',
    },
  ];
  return <NestedNav menuTitle="Menu" navItems={nav} />;
};
