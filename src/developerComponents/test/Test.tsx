'use client';

import { Session } from 'next-auth';

export type TestProps = {
  data?: string;
  session?: Session;
};
export const TestDevClientComponent: React.FC<TestProps> = ({
  data,
  session,
}) => {
  return (
    <div className="flex flex-col">
      <div>{data}</div>
      <div>User: {session?.user.name}</div>
    </div>
  );
};
