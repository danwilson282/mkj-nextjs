'use server';

import { Session } from 'next-auth';
import { TestDevClientComponent } from './Test';

export type TestProps = {
  session?: Session;
  data?: string;
};
export const TestDevServerComponent: React.FC<TestProps> = async ({
  data,
  session,
}) => {
  const serverData = 'I am returned from server side';
  return <TestDevClientComponent data={serverData} session={session} />;
};
