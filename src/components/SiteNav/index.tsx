'use client';

import { NestedNav, NestedNavProps } from '@danwilson282/mkj-component-library';
import { Session } from 'next-auth';
export type SiteNavProps = {
  nav: NestedNavProps['navItems'];
  session: Session;
};

export const SiteNav: React.FC<SiteNavProps> = ({ nav }) => {
  return <NestedNav menuTitle="Menu" navItems={nav} />;
};
